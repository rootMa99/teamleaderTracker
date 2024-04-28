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
            <Popup>You are here</Popup>
          </Marker>
          {/* Render marker and polyline for the selected position */}
          {selectedPosition && (
            <div>
              <Marker position={[selectedPosition.lat, selectedPosition.lng]} icon={targetIcon}>
                <Popup>Selected position</Popup>
              </Marker>
              <Polyline
                positions={[
                  [location.lat, location.lng], // Start position (user's location)
                  [selectedPosition.lat, selectedPosition.lng] // End position (selected position)
                ]}
                color="blue" // Color of the polyline
              />
            </div>
          )}
          {/* Component to handle map click events and update selected position */}
          <MapClickHandler setSelectedPosition={setSelectedPosition} />
        </MapContainer>
      ) : (
        <h1>Waiting...</h1>
      )}
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
