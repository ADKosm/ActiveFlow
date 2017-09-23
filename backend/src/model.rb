require 'mongoid'
require 'mongoid/enum'

class Record
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Enum

  field :user, type: String
  field :title, type: String
  field :description, type: String
  field :importance, type: Integer
  enum :status, [:in_progress, :backlog, :complete]
end