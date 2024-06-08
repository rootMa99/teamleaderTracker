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
import MapChart from "./components/home/MapChart.js";
import StackedBarCharts from "./components/home/StackedBarCharts.js";

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
  const stackedD=[
    {
      month:"01",
      crews:[
        {crew:"k1", ratio:2879},
        {crew:"k2", ratio:3889},
        {crew:"k3", ratio:4856},
        {crew:"k4", ratio:5856},
        {crew:"k5", ratio:6570},
        {crew:"k6", ratio:2879},
        {crew:"kÈ", ratio:7879},
        {crew:"k1s", ratio:6845},
        {crew:"ksd", ratio:2879},
        {crew:"kzz", ratio:5879},
        {crew:"kee", ratio:9879},
        {crew:"kèç", ratio:6879},
        {crew:"ké&", ratio:5879},
        {crew:"kvb", ratio:8879},
        {crew:"k89", ratio:2879},
        {crew:"k88", ratio:1879},
        {crew:"k77", ratio:879},
        {crew:"k4G", ratio:8879},
        {crew:"k2", ratio:1879},
        {crew:"k1UI", ratio:3879},
        {crew:"k88", ratio:8979},
        {crew:"k00", ratio:2379},
        {crew:"kNK", ratio:9079},
        {crew:"k221", ratio:6679},
        {crew:"kYU", ratio:7779},
        {crew:"kNK", ratio:4479},
        {crew:"k1PO", ratio:1179},
        {crew:"k1NJS8", ratio:3379},
        {crew:"k1NJ9", ratio:7279},
        {crew:"k1NN", ratio:1389},
      ]
    },
    {
      month:"02",
      crews:[
        {crew:"k1", ratio:2879},
        {crew:"k2", ratio:3889},
        {crew:"k3", ratio:4856},
        {crew:"k4", ratio:5856},
        {crew:"k5", ratio:6570},
        {crew:"k6", ratio:2879},
        {crew:"kÈ", ratio:7879},
        {crew:"k1s", ratio:6845},
        {crew:"ksd", ratio:2879},
        {crew:"kzz", ratio:5879},
        {crew:"kee", ratio:9879},
        {crew:"kèç", ratio:6879},
        {crew:"ké&", ratio:5879},
        {crew:"kvb", ratio:8879},
        {crew:"k89", ratio:2879},
        {crew:"k88", ratio:1879},
        {crew:"k77", ratio:879},
        {crew:"k4G", ratio:8879},
        {crew:"k2", ratio:1879},
        {crew:"k1UI", ratio:3879},
        {crew:"k88", ratio:8979},
        {crew:"k00", ratio:2379},
        {crew:"kNK", ratio:9079},
        {crew:"k221", ratio:6679},
        {crew:"kYU", ratio:7779},
        {crew:"kNK", ratio:4479},
        {crew:"k1PO", ratio:1179},
        {crew:"k1NJS8", ratio:3379},
        {crew:"k1NJ9", ratio:7279},
        {crew:"k1NN", ratio:1389},
      ]
    },
    
  ]
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
      <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
        <MapChart />
     </div>
     <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
        <StackedBarCharts data={stackedD} />
     </div>
    </div>
  );
}

export default App;
