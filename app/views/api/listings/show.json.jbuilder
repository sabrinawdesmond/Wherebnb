json.extract! @listing, :id, :host_id, :title, :description, :address, :city, :country, :price, :num_beds, :num_rooms, :num_bathrooms, :longitude, :latitude
json.host_username @listing.host.username
json.photo_url @listing.photo.attached? ? url_for(@listing.photo) : @listing.photo_url