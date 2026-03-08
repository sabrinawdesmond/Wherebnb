class Listing < ApplicationRecord
  validates :host_id, :title, :description, :address, :city, :country, :price, :num_beds, :num_rooms, :num_bathrooms, :longitude, :latitude, presence: true

  belongs_to :host,
    primary_key: :id,
    foreign_key: :host_id,
    class_name: :User

  has_many :reviews,
    foreign_key: :listing_id,
    dependent: :destroy

  has_one_attached :photo
end
