class Album < ActiveRecord::Base
  validates :name, :user_id, presence: true

  belongs_to :user
  has_many :albumings
  has_many :photos, through: :albumings
end
