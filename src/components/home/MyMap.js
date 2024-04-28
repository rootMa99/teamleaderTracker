import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import locationp from "../../assets/location.png"

// Define custom icon for the target marker
const targetIcon = L.icon({
  iconUrl: locationp, // URL to the custom marker icon
  iconSize: [41, 41], // Size of the icon (width, height)
  iconAnchor: [Math.floor(25 / 2), 41], // Automatic horizontal centering, bottom-aligned vertically
  popupAnchor: [0, -41] // Popup anchor point (top-left)
});

const MyMap = ({ location, error }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (location && selectedPosition) {
      // Calculate distance between current location and selected position
      const distanceInKm = calculateDistance(location, selectedPosition);
      setDistance(distanceInKm);
    }
  }, [location, selectedPosition]);

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (point1, point2) => {
    const R = 6371; // Radius of the Earth in km
    const lat1 = point1.lat;
    const lon1 = point1.lng;
    const lat2 = point2.lat;
    const lon2 = point2.lng;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {location ? (
        <MapContainer
          center={[location.lat, location.lng]} // Center the map on the user's location
          zoom={20} // Zoom level
          style={{ height: '90%', width: '80%', margin: 'auto' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* Render marker for the user's location */}
          <Marker position={[location.lat, location.lng]} icon={targetIcon}>
            <Popup>Your current position</Popup>
          </Marker>
          {/* Render marker and polyline for the selected position */}
          {selectedPosition && (
            <div>
              <Marker position={[selectedPosition.lat, selectedPosition.lng]} icon={targetIcon}>
                <Popup>Selected position</Popup>
              </Marker>
              <Polyline
                positions={[[location.lat, location.lng], [selectedPosition.lat, selectedPosition.lng]]}
                color="blue"
              />
            </div>
          )}
          {/* Component to handle map click events and update selected position */}
          <MapClickHandler setSelectedPosition={setSelectedPosition} />
        </MapContainer>
      ) : (
        <h1>Waiting...</h1>
      )}
      {/* Display distance if available */}
      {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      {/* Display error message if any */}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

// Component to handle map click events and update selected position
const MapClickHandler = ({ setSelectedPosition }) => {
  const map = useMapEvents({
    click: (event) => {
      // Get position of clicked point
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng
      });
    },
  });

  return null; // Return null because no component is rendered
};

export default MyMap;
