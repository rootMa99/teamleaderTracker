import "./App.css";
import TeamLeaderCard from "./components/home/TeamLeaderCard";
import NavBar from "./components/ui/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="teamLeaders">
        <TeamLeaderCard inver={true} />
        <TeamLeaderCard />
      </div>
    </div>
  );
}

export default App;
