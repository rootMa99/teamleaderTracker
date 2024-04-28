import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationp from "../../assets/location.png";

const targetIcon = L.icon({
  iconUrl: locationp,
  iconSize: [41, 41],
  iconAnchor: [Math.floor(25 / 2), 41],
  popupAnchor: [0, -41],
});

const MyMap = ({ location, error }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const lat1 = point1.lat;
    const lon1 = point1.lng;
    const lat2 = point2.lat;
    const lon2 = point2.lng;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  useEffect(() => {
    if (location && selectedPosition) {
      const distanceInKm = calculateDistance(location, selectedPosition);
      setDistance(distanceInKm);
    }
  }, [location, selectedPosition]);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {location ? (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={20}
          style={{ height: "90%", width: "80%", margin: "auto" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} icon={targetIcon}>
            <Popup>Your current position</Popup>
          </Marker>
          {selectedPosition && (
            <div>
              <Marker
                position={[selectedPosition.lat, selectedPosition.lng]}
                icon={targetIcon}
              >
                <Popup>Selected position</Popup>
              </Marker>
              <Polyline
                positions={[
                  [location.lat, location.lng],
                  [selectedPosition.lat, selectedPosition.lng],
                ]}
                color="blue"
              />
            </div>
          )}
          <MapClickHandler setSelectedPosition={setSelectedPosition} />
        </MapContainer>
      ) : (
        <h1>Waiting...</h1>
      )}
      {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

const MapClickHandler = ({ setSelectedPosition }) => {
  const map = useMapEvents({
    click: (event) => {
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
};

export default MyMap;
