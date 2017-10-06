require 'mongoid'
require 'sinatra'
require 'sinatra/json'
require_relative 'model'

use Rack::Logger

helpers do
  def logger
    request.logger
  end
end

Mongoid.load!('mongoid.yml', :development)

set :bind, '0.0.0.0'
set :port, 9494

importance_match = {
    '' => 1,
    'Low' => 0,
    'Medium' => 1,
    'High' => 2
}

get '/get/:id' do |id|
  records = Record.where(:user => id, :_status => :in_progress).desc(:importance)
  json records
end

post '/add/:id' do |id|
  begin
    request.body.rewind
    data = JSON.parse request.body.read

    logger.debug(data)

    Record.create!(
        :user => id,
        :title => data['title'],
        :description => data['description'],
        :importance => importance_match[data['importance']],
        :status => :in_progress
    )

    json data
  rescue
    json :status => 'error'
  end
end

post '/complete/:id' do |id|
  begin
    request.body.rewind
    task_id = request.body.read
    record = Record.where(:user => id, :_id => task_id).first
    if record
      record.complete!
      record.save!
    end
    json :status => 'ok'
  rescue
    json :status => 'error'
  end
end

post '/delete/:id' do |id|
  begin
    request.body.rewind
    task_id = request.body.read
    record = Record.where(:user => id, :_id => task_id).first
    if record
      record.delete
    end
    json :status => 'ok'
  rescue
    json :status => 'error'
  end
end

post '/restage/:new_stage/:id' do |new_stage, id|
  begin
    request.body.rewind
    task_id = request.body.read
    record = Record.where(:user => id, :_id => task_id).first
    if record
      record.update(stage: new_stage)
      json :status => 'ok'
    end
  rescue
    json :status => 'error'
  end
end