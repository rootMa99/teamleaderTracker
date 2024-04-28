import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import locationp from "../../assets/location.png"

// Define custom icon for the target marker
const targetIcon = L.icon({
  iconUrl: locationp, // URL to the target marker icon
  iconSize: [25, 25], // Size of the icon (width, height)
  iconAnchor: [12, 12], // Anchor point of the icon (centered)
  popupAnchor: [0, -12] // Popup anchor point (top-left)
});

const MyMapT = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    // Get current position using geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

  return (
    <div style={{ height: 'calc(100vh - 60px)', width: '100%' }}>
      <MapContainer
        center={[51.505, -0.09]} // Default center (London)
        zoom={13} // Default zoom level
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]}>
            <Popup>Your current position</Popup>
          </Marker>
        )}
        <MapClickHandler setSelectedPosition={setSelectedPosition} />
        {selectedPosition && (
          <div>
            <Marker position={[selectedPosition.lat, selectedPosition.lng]} icon={targetIcon}>
              <Popup>Selected position</Popup>
            </Marker>
            <Polyline positions={[[currentPosition.lat, currentPosition.lng], [selectedPosition.lat, selectedPosition.lng]]} color="blue" />
          </div>
        )}
      </MapContainer>
    </div>
  );
};

const MapClickHandler = ({ setSelectedPosition }) => {
  const map = useMapEvents({
    click: (event) => {
      
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng
      });
    },
  });

  return null; // Return null because no component is rendered
};

export default MyMapT;
