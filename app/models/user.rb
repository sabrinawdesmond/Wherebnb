class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
  validates :email, uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  before_validation :ensure_session_token

  has_many :listings,
    primary_key: :id,
    foreign_key: :host_id,
    class_name: :Listing,
    dependent: :destroy

  has_many :reviews,
    primary_key: :id,
    foreign_key: :reviewer_id,
    class_name: :Review,
    dependent: :destroy

  has_many :bookings,
    primary_key: :id,
    foreign_key: :guest_id,
    class_name: :Booking,
    dependent: :destroy

  def self.find_by_credentials(credential, password)
    user = credential.match(URI::MailTo::EMAIL_REGEXP) ?
      User.find_by(email: credential) :
      User.find_by(username: credential)
    user&.authenticate(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    token = SecureRandom.urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end