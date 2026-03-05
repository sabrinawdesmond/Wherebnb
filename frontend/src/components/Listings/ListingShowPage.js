import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing, getListing } from "../../store/listings";
import { fetchReviews, getReviews } from "../../store/reviews";
import { useEffect } from "react";
import placeholderImg from "./airbnb.png";
import "./ListingShowPage.css";
import ListingStats from "./ListingStats";
import ReviewIndex from "../Reviews/ReviewIndex";
import ListingMap from "../Map/ListingMap";
import BookingForm from "../Bookings/BookingForm";

const ListingShowPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const reviews = useSelector(getReviews);

  useEffect(() => {
    dispatch(fetchListing(listingId));
    dispatch(fetchReviews(listingId));
  }, [listingId, dispatch]);

  if (!listing) return null;

  const photo = listing.photo_url || placeholderImg;

  return (
    <>
      <div className="listing-info">
        <h1>{listing.title}</h1>
        <span>{listing.city}, {listing.country}</span>
      </div>
      <div className="ListingPage">
        <div className="photos">
          <div className="listing-photo">
            <img src={photo} alt="listing" />
            <div className="listing-small-photos">
              <img src={photo} alt="listing" />
              <img src={photo} alt="listing" />
              <img src={photo} alt="listing" />
              <img src={photo} alt="listing" />
            </div>
          </div>
        </div>
      </div>
      <div className="show-content-layout">
        <div className="show-main-content">
          <div className="host-room-info">
            <h2>Entire home hosted by {listing.host_username}</h2>
          </div>
          <div className="room-info">
            <h3>
              Guests: {listing.num_beds * 2} · Beds: {listing.num_beds} · Bathrooms: {listing.num_bathrooms}
            </h3>
          </div>
          <ListingStats />
          <div className="listing-description">
            <p>{listing.description}</p>
          </div>
        </div>
        <div className="show-booking-sidebar">
          <BookingForm listing={listing} />
        </div>
      </div>
      <ReviewIndex reviews={reviews} listingId={listingId} />
      <div className="show-map-section">
        <h2>Where you'll be</h2>
        <div className="show-map-container">
          <ListingMap singleListing={listing} />
        </div>
      </div>
    </>
  );
};

export default ListingShowPage;