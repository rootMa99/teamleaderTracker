import c from "./TeamLeaderCard.module.css";
import me from "../../assets/aptiv_logo_rev_orange_rgb.png";

const TeamLeaderCard = (p) => {
  return (
    <div
      className={c.container}
      style={p.inver ? {} : { "flex-direction": "row-reverse" }}
    >
      <img
        src={me}
        className={p.inver ? c.imgContainer : c.imgContainerinv}
        alt="aptiv"
        draggable="false"
      />
      <h1 className={p.inver ? c.title : c.titleinv}>naji mohamed</h1>
      <div className={p.inver ? c.dataContainer : c.dataContainerinver}>
        <div className={c.ty}>
          <h3>efficiency:</h3>
          <div className={c.data}>
            <div className={c.ind}>
              <span>actual:</span>
              <p>86%</p>
            </div>
            <div className={c.ind}>
              <span>target:</span>
              <p>91%</p>
            </div>
            <div className={c.ind}>
              <span>gap:</span>
              <p>-5%</p>
            </div>
          </div>
        </div>
        <div className={c.ty}>
          <h3>head count:</h3>
          <div className={c.data}>
            <div className={c.ind}>
              <span>actual:</span>
              <p>86%</p>
            </div>
            <div className={c.ind}>
              <span>target:</span>
              <p>91%</p>
            </div>
            <div className={c.ind}>
              <span>gap:</span>
              <p>-5%</p>
            </div>
          </div>
        </div>
        <div className={c.ty}>
          <h3>output</h3>
          <div className={c.data}>
            <div className={c.ind}>
              <span>actual:</span>
              <p>86%</p>
            </div>
            <div className={c.ind}>
              <span>target:</span>
              <p>91%</p>
            </div>
            <div className={c.ind}>
              <span>gap:</span>
              <p>-5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderCard;
