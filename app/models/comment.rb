class Comment < ActiveRecord::Base
  validates :body, :photo_id, :user_id, presence: true

  belongs_to :photo
  belongs_to :user
end
