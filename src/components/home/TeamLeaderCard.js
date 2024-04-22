import c from "./TeamLeaderCard.module.css";
import me from "../../assets/me.jpeg";

const TeamLeaderCard = (p) => {
  return (
    <div className={c.container} style={p.inver? {} :{'flex-direction': 'row-reverse'}}>
      <img
        src={me}
        className={p.inver ? c.imgContainer : c.imgContainerinv}
        alt="aptiv"
        draggable="false"
      />
        <h1 className={p.inver ? c.title : c.titleinv}>Anass Zeroual</h1>
      <div className={p.inver ? c.dataContainer : c.dataContainerinver}></div>
    </div>
  );
};

export default TeamLeaderCard;
