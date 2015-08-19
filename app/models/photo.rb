class Photo < ActiveRecord::Base
  validates :user_id, :url, :thumb_url, presence: true

  belongs_to :user
  has_many :comments
  has_many :votings, dependent: :destroy

  def sum_score
    sum = 0
    self.votings.each do |voting|
      sum += voting.score
    end
    sum
  end
end
