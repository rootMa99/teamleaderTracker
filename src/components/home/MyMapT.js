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
  iconSize: [25, 25], 
  iconAnchor: [12, 12], 
  popupAnchor: [0, -12], 
});

const MyMapT = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  const mapEvents = useMapEvents({
    click: (event) => {
      setSelectedPosition({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return (
    <div style={{ height: "calc(100vh - 60px)", width: "100%" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentPosition && (
          <Marker position={[currentPosition.lat, currentPosition.lng]}>
            <Popup>Your current position</Popup>
          </Marker>
        )}
        {selectedPosition && (
          <>
            <Marker
              position={[selectedPosition.lat, selectedPosition.lng]}
              icon={targetIcon}
            >
              <Popup>Selected position</Popup>
            </Marker>
            <Polyline
              positions={[
                [currentPosition.lat, currentPosition.lng],
                [selectedPosition.lat, selectedPosition.lng],
              ]}
              color="blue"
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMapT;
