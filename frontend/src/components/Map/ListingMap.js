import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ListingMap.css";

const mapContainerStyle = { width: "100%", height: "100%" };

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
};

function ListingMap({ listings, singleListing }) {
  const history = useHistory();
  const [selectedListing, setSelectedListing] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div className="map-loading">Loading map...</div>;

  // Single listing mode (show page) — center on the property
  if (singleListing) {
    const center = { lat: singleListing.latitude, lng: singleListing.longitude };
    return (
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          options={mapOptions}
        >
          <Marker position={center} title={singleListing.title} />
        </GoogleMap>
      </div>
    );
  }

  // Index mode — show all listings as markers
  // Calculate center from average of all listing coordinates
  const validListings = listings.filter(l => l.latitude && l.longitude);
  const center = validListings.length > 0 ? {
    lat: validListings.reduce((sum, l) => sum + l.latitude, 0) / validListings.length,
    lng: validListings.reduce((sum, l) => sum + l.longitude, 0) / validListings.length,
  } : { lat: 37.7749, lng: -122.4194 }; // Default: San Francisco

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={5}
        options={mapOptions}
      >
        {validListings.map(listing => (
          <Marker
            key={listing.id}
            position={{ lat: listing.latitude, lng: listing.longitude }}
            onClick={() => setSelectedListing(listing)}
          />
        ))}

        {selectedListing && (
          <InfoWindow
            position={{ lat: selectedListing.latitude, lng: selectedListing.longitude }}
            onCloseClick={() => setSelectedListing(null)}
          >
            <div
              className="map-info-window"
              onClick={() => history.push(`/listings/${selectedListing.id}`)}
            >
              {selectedListing.photo_url && (
                <img src={selectedListing.photo_url} alt={selectedListing.title} />
              )}
              <p className="info-title">{selectedListing.title}</p>
              <p className="info-city">{selectedListing.city}, {selectedListing.country}</p>
              <p className="info-price"><strong>${selectedListing.price}</strong> / night</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default ListingMap;