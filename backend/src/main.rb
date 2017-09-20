require 'mongoid'
require 'sinatra'
require "sinatra/json"

Mongoid.load!('mongoid.yml', :development)

set :bind, '0.0.0.0'
set :port, 9494

get '/get/:id' do |id|
  json [
      {:title => "This is title", :desc => "This is a long description! It can be realy big, but maybe not", :rate => 3},
      {:title => "This is title", :desc => "This is a long description! It can be realy big, but maybe not", :rate => 3},
      {:title => "This is title", :desc => "This is a long description! It can be realy big, but maybe not", :rate => 3}
  ]
end

post '/add/' do
end