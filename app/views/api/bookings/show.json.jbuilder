json.id @booking.id
json.guest_id @booking.guest_id
json.listing_id @booking.listing_id
json.start_date @booking.start_date
json.end_date @booking.end_date
json.num_guests @booking.num_guests
json.listing_title @booking.listing.title
json.listing_city @booking.listing.city
json.listing_country @booking.listing.country
json.listing_price @booking.listing.price
json.listing_photo_url @booking.listing.photo.attached? ? url_for(@booking.listing.photo) : @booking.listing.photo_url
