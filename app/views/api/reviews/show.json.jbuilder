json.extract! @review, :id, :reviewer_id, :listing_id, :body, :overall, :cleanliness, :accuracy, :communication, :location, :check_in, :value
json.reviewer_username @review.reviewer.username