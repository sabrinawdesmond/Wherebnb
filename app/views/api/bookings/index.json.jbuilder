json.bookings do
  json.array! @bookings, :id, :guest_id, :listing_id, :start_date, :end_date, :num_guests
end
