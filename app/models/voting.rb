class Voting < ActiveRecord::Base
  validates :user_id, :photo_id, :score, presence: true
  validates :user_id, uniqueness: { scope: :photo_id }

  belongs_to :user
  belongs_to :photo
end
