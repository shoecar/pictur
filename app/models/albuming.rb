class Albuming < ActiveRecord::Base
  validates :photo_id, :album_id, presence: true
  validates :photo_id, uniqueness: { scope: :album_id }

  belongs_to :photo
  belongs_to :album
end
