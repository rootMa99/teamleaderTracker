import { useEffect, useState } from "react";
import "./App.css";
import Chart from "./components/home/Chart";
import GatLocation from "./components/home/GatLocation.js";
import GeoLocationComponent from "./components/home/GeoLocationComponent.js";
import MyComponent from "./components/home/MyComponent.js";
import MyDropzone from "./components/home/MyDropzone.js";
import MyMap from "./components/home/MyMap.js";
// import MyMap from "./components/home/MyMap.js";
import StackedBarChart from "./components/home/StackedBarChart";
import NavBar from "./components/ui/NavBar";

function App() {
  const data = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 25 },
  ];
  const dataf = [
    { label: "A", series1: 100, series2: 20, series3: 30 },
    { label: "B", series1: 15, series2: 25, series3: 35 },
    { label: "BC", series1: 11, series2: 35, series3: 25 },
    { label: "BD", series1: 17, series2: 5, series3: 3 },
  ];
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div style={{ height: "30rem", backgroundColor: "#634747" }}>
        <h1>Please drop file here</h1>
        <Chart data={data} />
      </div>
      <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
        <StackedBarChart data={dataf} />
      </div>
      <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
        <MyDropzone />
        <MyComponent />
        <GatLocation />
        <GeoLocationComponent />
      </div>
      <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
       <MyMap location={location} error={error}/>
      </div>

    </div>
  );
}

export default App;
