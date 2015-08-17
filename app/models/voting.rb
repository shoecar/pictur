class Voting < ActiveRecord::Base
  validates :user_id, :photo_id, :score, presence: true

  belongs_to :user
  belongs_to :photo
end
