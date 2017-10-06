require 'mongoid'
require_relative '../model'

Mongoid.load!('../mongoid.yml', :development)

Record.update_all(stage: "todo")
