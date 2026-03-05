class Booking < ApplicationRecord
  validates :guest_id, :listing_id, :start_date, :end_date, :num_guests, presence: true
  validate :end_date_after_start_date

  belongs_to :guest, foreign_key: :guest_id, class_name: :User
  belongs_to :listing

  private

  def end_date_after_start_date
    return unless start_date && end_date
    errors.add(:end_date, "must be after start date") if end_date <= start_date
  end
end
