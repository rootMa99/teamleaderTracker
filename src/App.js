import "./App.css";
import Chart from "./components/home/Chart";
import MyDropzone from "./components/home/MyDropzone.js";
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
      </div>
    </div>
  );
}

export default App;
