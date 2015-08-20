class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_token

  attr_reader :password

  has_many :photos
  has_many :comments
  has_many :albums
  has_many :votings, dependent: :destroy

  def self.find_by_creds(username, password)
    user = User.find_by_username(username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    save
    self.session_token
  end

  private
  def ensure_token
    self.session_token ||= reset_token!
  end
end
