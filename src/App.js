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
import StbarChartD3 from "./components/home/StbarChartD3.js";


//datasets: data.flatMap((m, monthIndex) =>
//     m.crews.map((crew, crewIndex) => ({
//       label: `${m.month} - ${crew.crew}`,
//       data: data.map((monthData) => crew.ratio),
//       backgroundColor: colors[crewIndex % colors.length],
//     }))
//   ),

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

  const stackedD= [
    {
      "families": [
        {
          "family": "Project",
          "ratio": 0,
          "target": 46585.81163434903
        },
        {
          "family": "Habitacle",
          "ratio": 86354.96183206106,
          "target": 197000
        },
        {
          "family": "Principale",
          "ratio": 204731.57415832573,
          "target": 210685
        },
        {
          "family": "PDB",
          "ratio": 33915.72456320658,
          "target": 68462
        },
        {
          "family": "P.AVG",
          "ratio": 0,
          "target": 5100
        },
        {
          "family": "P.AVD",
          "ratio": 0,
          "target": 5100
        },
        {
          "family": "PLC",
          "ratio": 0,
          "target": 350
        },
        {
          "family": "Porte_Battante",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Console",
          "ratio": 0,
          "target": 300
        },
        {
          "family": "Sous_caisse",
          "ratio": 0,
          "target": 1700
        },
        {
          "family": "Parchoc_Avant",
          "ratio": 0,
          "target": 850
        },
        {
          "family": "Parchoc_Arriere",
          "ratio": 0,
          "target": 1550
        },
        {
          "family": "Pavillon",
          "ratio": 615.7635467980296,
          "target": 2900
        },
        {
          "family": "Jauge_carburant",
          "ratio": 0,
          "target": 200
        },
        {
          "family": "Auvent",
          "ratio": 0,
          "target": 50
        },
        {
          "family": "Airbag",
          "ratio": 0,
          "target": 40
        },
        {
          "family": "Lave_vitre",
          "ratio": 0,
          "target": 0
        },
        {
          "family": "Sous_caisse_Ecars",
          "ratio": 0,
          "target": 40
        },
        {
          "family": "Attache_remorque",
          "ratio": 0,
          "target": 740
        },
        {
          "family": "3FJE",
          "ratio": 0,
          "target": 40
        },
        {
          "family": "Portes_AV",
          "ratio": 0,
          "target": 1400
        },
        {
          "family": "Portes_AR",
          "ratio": 0,
          "target": 1400
        },
        {
          "family": "PC_AVG",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "PC_AVD",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Volet",
          "ratio": 8376.963350785341,
          "target": 1400
        },
        {
          "family": "CHC",
          "ratio": 429.1108822519739,
          "target": 700
        },
        {
          "family": "ATN8",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "ATN8-T9",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Con_BVA",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Con_BVM",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Lave_Vitre",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "ARTIV",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Essuie_Vitre",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Tweeter",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "Escamo",
          "ratio": 0,
          "target": 700
        },
        {
          "family": "STTA",
          "ratio": 0,
          "target": 800
        },
        {
          "family": "CBEB",
          "ratio": 0,
          "target": 100
        },
        {
          "family": "Emetteur",
          "ratio": 0,
          "target": 100
        }
      ],
      "month": "January"
    },
    {
      "families": [
        {
          "family": "Project",
          "ratio": 0,
          "target": 45885.368421052626
        },
        {
          "family": "Habitacle",
          "ratio": 175700.93457943926,
          "target": 189000
        },
        {
          "family": "Principale",
          "ratio": 385065.8857979502,
          "target": 205150
        },
        {
          "family": "PDB",
          "ratio": 61705.98911070781,
          "target": 73462
        },
        {
          "family": "P.AVG",
          "ratio": 0,
          "target": 4845
        },
        {
          "family": "P.AVD",
          "ratio": 0,
          "target": 4845
        },
        {
          "family": "PLC",
          "ratio": 0,
          "target": 333
        },
        {
          "family": "Porte_Battante",
          "ratio": 0,
          "target": 665
        },
        {
          "family": "Console",
          "ratio": 0,
          "target": 285
        },
        {
          "family": "Sous_caisse",
          "ratio": 0,
          "target": 1545
        },
        {
          "family": "Parchoc_Avant",
          "ratio": 0,
          "target": 773
        },
        {
          "family": "Parchoc_Arriere",
          "ratio": 0,
          "target": 1403
        },
        {
          "family": "Pavillon",
          "ratio": 0,
          "target": 2685
        },
        {
          "family": "Jauge_carburant",
          "ratio": 0,
          "target": 190
        },
        {
          "family": "Auvent",
          "ratio": 0,
          "target": 48
        },
        {
          "family": "Airbag",
          "ratio": 0,
          "target": 38
        },
        {
          "family": "Lave_vitre",
          "ratio": 0,
          "target": 0
        },
        {
          "family": "Sous_caisse_Ecars",
          "ratio": 0,
          "target": 38
        },
        {
          "family": "Attache_remorque",
          "ratio": 0,
          "target": 668
        },
        {
          "family": "3FJE",
          "ratio": 0,
          "target": 38
        },
        {
          "family": "Portes_AV",
          "ratio": 0,
          "target": 1260
        },
        {
          "family": "Portes_AR",
          "ratio": 0,
          "target": 1260
        },
        {
          "family": "PC_AVG",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "PC_AVD",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Volet",
          "ratio": 13440.860215053764,
          "target": 1260
        },
        {
          "family": "CHC",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "ATN8",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "ATN8-T9",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Con_BVA",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Con_BVM",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Lave_Vitre",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "ARTIV",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Essuie_Vitre",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Tweeter",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "Escamo",
          "ratio": 0,
          "target": 630
        },
        {
          "family": "STTA",
          "ratio": 0,
          "target": 730
        },
        {
          "family": "CBEB",
          "ratio": 0,
          "target": 100
        },
        {
          "family": "Emetteur",
          "ratio": 0,
          "target": 100
        }
      ],
      "month": "February"
    }
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

// <div style={{ height: "30rem", backgroundColor: "#3d7558" }}>
//         <StbarChartD3 data={stackedD} />
//      </div>