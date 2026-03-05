import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  payload: reviews
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  payload: review
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  payload: reviewId
});

// Selectors
export const getReviews = state => {
  return state?.reviews ? Object.values(state.reviews) : [];
};

export const getReview = (reviewId) => state => {
  return state?.reviews ? state.reviews[reviewId] : null;
};

// Thunks — reviews are nested under listings
export const fetchReviews = (listingId) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${listingId}/reviews`);
  const data = await response.json();
  dispatch(receiveReviews(data));
};

export const createReview = (listingId, review) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${listingId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  dispatch(receiveReview(data));
};

export const updateReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  dispatch(receiveReview(data));
};

export const deleteReview = (reviewId) => async dispatch => {
  await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
  dispatch(removeReview(reviewId));
};

// Reducer
const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...state, ...action.payload.reviews };
    case RECEIVE_REVIEW:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;