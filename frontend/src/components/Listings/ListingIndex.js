import { useDispatch, useSelector } from "react-redux";
import { getListings, fetchListings } from "../../store/listings";
import { useEffect } from "react";
import ListingIndexItem from "./ListingIndexItem";
import ListingMap from "../Map/ListingMap";
import "./ListingIndex.css";

const ListingIndex = () => {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <div className="listing-index-layout">
      <div className="listingsIndex">
        <ul className="listings-grid">
          {listings.map(listing => (
            <ListingIndexItem listing={listing} key={listing.id} />
          ))}
        </ul>
      </div>
      <div className="index-map">
        <ListingMap listings={listings} />
      </div>
    </div>
  );
};

export default ListingIndex;