import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchUserBookings,
  deleteBooking,
  updateBooking,
  getBookings,
} from "../../store/bookings";
import placeholderImg from "../Listings/airbnb.png";
import "./ProfilePage.css";

const formatDate = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const calcNights = (start, end) =>
  Math.round((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));

const getStatus = (startDate, endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  if (end < today) return "past";
  if (start <= today) return "active";
  return "upcoming";
};

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const allBookings = useSelector(getBookings);

  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [editErrors, setEditErrors] = useState([]);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
      return;
    }
    setLoading(true);
    dispatch(fetchUserBookings()).finally(() => setLoading(false));
  }, [dispatch, sessionUser, history]);

  const myBookings = allBookings
    .filter((b) => b.guest_id === sessionUser?.id && b.listing_title)
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

  const handleCancel = (bookingId) => {
    if (window.confirm("Cancel this booking? This cannot be undone.")) {
      dispatch(deleteBooking(bookingId));
    }
  };

  const handleStartEdit = (booking) => {
    setEditingId(booking.id);
    setEditStart(booking.start_date);
    setEditEnd(booking.end_date);
    setEditErrors([]);
  };

  const handleSaveEdit = async (booking) => {
    setEditErrors([]);
    try {
      await dispatch(
        updateBooking({ id: booking.id, start_date: editStart, end_date: editEnd })
      );
      setEditingId(null);
    } catch (res) {
      const data = await res.json();
      setEditErrors(data.errors || ["Could not update booking."]);
    }
  };

  if (!sessionUser) return null;

  return (
    <div className="profile-page">
      <h1 className="profile-heading">My trips</h1>

      {loading ? (
        <p className="profile-loading">Loading your trips...</p>
      ) : myBookings.length === 0 ? (
        <div className="profile-empty">
          <p>No trips booked yet.</p>
          <button
            className="profile-explore-btn"
            onClick={() => history.push("/")}
          >
            Explore listings
          </button>
        </div>
      ) : (
        <div className="profile-bookings-list">
          {myBookings.map((booking) => {
            const numNights = calcNights(booking.start_date, booking.end_date);
            const total = numNights * booking.listing_price;
            const photo = booking.listing_photo_url || placeholderImg;
            const status = getStatus(booking.start_date, booking.end_date);
            const isEditing = editingId === booking.id;

            return (
              <div key={booking.id} className="profile-booking-card">
                <img
                  className="profile-booking-photo"
                  src={photo}
                  alt={booking.listing_title}
                />
                <div className="profile-booking-details">
                  <div className="profile-booking-top">
                    <div>
                      <h2 className="profile-booking-title">
                        {booking.listing_title}
                      </h2>
                      <p className="profile-booking-location">
                        {booking.listing_city}, {booking.listing_country}
                      </p>
                    </div>
                    <span className={`booking-status-badge status-${status}`}>
                      {status === "upcoming" ? "Upcoming" : status === "active" ? "Active" : "Past"}
                    </span>
                  </div>

                  {isEditing ? (
                    <div className="booking-edit-form">
                      {editErrors.length > 0 && (
                        <ul className="edit-errors">
                          {editErrors.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                      )}
                      <div className="edit-date-fields">
                        <div className="edit-date-field">
                          <label>CHECK-IN</label>
                          <input
                            type="date"
                            value={editStart}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setEditStart(e.target.value)}
                          />
                        </div>
                        <div className="edit-date-field">
                          <label>CHECKOUT</label>
                          <input
                            type="date"
                            value={editEnd}
                            min={editStart}
                            onChange={(e) => setEditEnd(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="edit-actions">
                        <button
                          className="edit-save-btn"
                          onClick={() => handleSaveEdit(booking)}
                        >
                          Save changes
                        </button>
                        <button
                          className="edit-cancel-btn"
                          onClick={() => setEditingId(null)}
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-booking-dates">
                      <span>{formatDate(booking.start_date)}</span>
                      <span className="profile-date-arrow"> → </span>
                      <span>{formatDate(booking.end_date)}</span>
                      <span className="profile-booking-nights">
                        &nbsp;· {numNights} night{numNights !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}

                  <p className="profile-booking-guests">
                    {booking.num_guests} guest{booking.num_guests !== 1 ? "s" : ""}
                  </p>

                  <div className="profile-booking-footer">
                    <p className="profile-booking-total">
                      <strong>${total.toFixed(2)}</strong> total
                      <span className="profile-booking-rate">
                        &nbsp;(${booking.listing_price} / night)
                      </span>
                    </p>
                    {status !== "past" && (
                      <div className="profile-actions">
                        {!isEditing && (
                          <button
                            className="profile-edit-btn"
                            onClick={() => handleStartEdit(booking)}
                          >
                            Edit dates
                          </button>
                        )}
                        <button
                          className="profile-cancel-btn"
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
