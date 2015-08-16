class Photo < ActiveRecord::Base
  validates :user_id, :url, :thumb_url, presence: true

  belongs_to :user
  has_many :comments
end
