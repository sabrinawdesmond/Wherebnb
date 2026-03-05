import "./ListingIndex.css";
import { Link, useHistory } from "react-router-dom";
import placeholderImg from "./airbnb.png";

const ListingIndexItem = ({ listing }) => {
  const history = useHistory();
  const photo = listing.photo_url || placeholderImg;

  return (
    <div className="listing-item">
      <div onClick={() => history.push(`/listings/${listing.id}`)}>
        <Link to={`/listings/${listing.id}`}>
        <div className="photo-container">
            <img src={photo} alt="photo" />
            </div>
          <h4>{<span>{listing.city}, {listing.country}</span>}</h4>
          <div className="distance-dates">
            <h4>500 miles away</h4>
          <h4>July 9-14</h4>
          </div>
          <h4>{<span>${listing.price}</span>} per night</h4>
        </Link>
      </div>
    </div>
  );
};

export default ListingIndexItem;
