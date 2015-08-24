class Photo < ActiveRecord::Base
  validates :user_id, :url, :thumb_url, presence: true

  belongs_to :user
  has_many :comments
  has_many :albumings
  has_many :albums, through: :albumings
  has_many :votings, dependent: :delete_all

  def sum_score
    sum = 0
    self.votings.each do |voting|
      sum += voting.score
    end
    sum
  end
end
