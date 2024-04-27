import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locationp from "../../assets/location.png"
import L from 'leaflet';

const MyMap = ({location, error}) => {
  
  const customIcon = L.icon({
    iconUrl: locationp, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [0, -41] 
  });


  return (
    <div style={{ height: "100%", width: "100%" }}>
      {location ? (
        <MapContainer
          center={[location.lat, location.lng]} 
          zoom={20} 
          style={{ height: "90%", width: "80%", margin:"auto" }}
        >
        {console.log("you see me", location.lat, location.lng)}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <h1>waiting....</h1>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MyMap;
