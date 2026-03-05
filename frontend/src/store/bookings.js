import csrfFetch from "./csrf";

export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS';
export const RECEIVE_BOOKING = 'RECEIVE_BOOKING';
export const REMOVE_BOOKING = 'REMOVE_BOOKING';

export const receiveBookings = (bookings) => ({
  type: RECEIVE_BOOKINGS,
  payload: bookings
});

export const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  payload: booking
});

export const removeBooking = (bookingId) => ({
  type: REMOVE_BOOKING,
  payload: bookingId
});

export const getBookings = state => state?.bookings ? Object.values(state.bookings) : [];

export const getBooking = (bookingId) => state => state?.bookings ? state.bookings[bookingId] : null;

export const fetchBookings = (listingId) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${listingId}/bookings`);
  const data = await response.json();
  dispatch(receiveBookings(data));
};

export const fetchUserBookings = () => async dispatch => {
  const response = await csrfFetch('/api/bookings');
  const data = await response.json();
  dispatch(receiveBookings(data));
};

export const createBooking = (listingId, booking) => async dispatch => {
  const response = await csrfFetch(`/api/listings/${listingId}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) throw response;
  const data = await response.json();
  dispatch(receiveBooking(data));
};

export const updateBooking = (booking) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    body: JSON.stringify(booking),
    headers: { "Content-Type": "application/json" }
  });
  if (!response.ok) throw response;
  const data = await response.json();
  dispatch(receiveBooking(data));
};

export const deleteBooking = (bookingId) => async dispatch => {
  await csrfFetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
  dispatch(removeBooking(bookingId));
};

const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_BOOKINGS:
      return { ...state, ...action.payload.bookings };
    case RECEIVE_BOOKING:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_BOOKING: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
