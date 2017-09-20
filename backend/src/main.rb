require 'mongoid'
require 'sinatra'
require "sinatra/json"

Mongoid.load!('mongoid.yml', :development)

set :bind, '0.0.0.0'
set :port, 9494

get '/get/:id' do |id|
  json :id => id
end

post '/add/' do
end