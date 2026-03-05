import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/bookings";
import "./BookingForm.css";

function BookingForm({ listing }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [errors, setErrors] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const nights =
    startDate && endDate
      ? Math.max(
          0,
          Math.round(
            (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const total = nights * listing.price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await dispatch(
        createBooking(listing.id, {
          start_date: startDate,
          end_date: endDate,
          num_guests: numGuests,
        })
      );
      setConfirmed(true);
    } catch (res) {
      const data = await res.json();
      setErrors(data.errors || ["Something went wrong."]);
    }
  };

  if (confirmed) {
    return (
      <div className="booking-card booking-confirmed">
        <h3>Booking confirmed!</h3>
        <p>
          {startDate} &rarr; {endDate}
        </p>
        <p>{numGuests} guest{numGuests > 1 ? "s" : ""}</p>
        <button
          className="reserve-btn"
          onClick={() => {
            setConfirmed(false);
            setStartDate("");
            setEndDate("");
            setNumGuests(1);
          }}
        >
          Book again
        </button>
      </div>
    );
  }

  return (
    <div className="booking-card">
      <div className="booking-price">
        <span className="price-amount">${listing.price}</span>
        <span className="price-unit"> / night</span>
      </div>

      {errors.length > 0 && (
        <ul className="booking-errors">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="date-fields">
          <div className="date-field">
            <label>CHECK-IN</label>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="date-field">
            <label>CHECKOUT</label>
            <input
              type="date"
              value={endDate}
              min={startDate || new Date().toISOString().split("T")[0]}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="guests-field">
          <label>GUESTS</label>
          <input
            type="number"
            min="1"
            max={listing.num_beds * 2}
            value={numGuests}
            onChange={(e) => setNumGuests(Number(e.target.value))}
            required
          />
        </div>

        {!sessionUser ? (
          <p className="login-prompt">Log in to book this listing</p>
        ) : (
          <button type="submit" className="reserve-btn">
            Reserve
          </button>
        )}
      </form>

      {nights > 0 && (
        <div className="booking-summary">
          <div className="summary-line">
            <span>
              ${listing.price} &times; {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <strong>Total before taxes</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
