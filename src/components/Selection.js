import { Link } from "react-router-dom";
import useGameData from "../assists/useGameData";
import "../styles/Selection.css";

export default function Selection({ version }) {
  const { firstMap, scndMap, charSelection1, charSelection2 } =
    useGameData(version);

  let gameLink1 = "animeX";
  let gameLink2 = "gameX";

  if (version === "kids") {
    gameLink1 = "peppaPig";
    gameLink2 = "roboCar";
  }

  return (
    <main id="selection">
      <div className="card">
        <ul>
          {charSelection1.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} className="chars" />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={firstMap.miniUrl} alt={firstMap.name} />
        <Link to={gameLink1}>
          <button>{firstMap.name}</button>
        </Link>
      </div>
      <div className="card">
        <ul>
          {charSelection2.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} className="chars" />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={scndMap.miniUrl} alt={scndMap.name} />
        <Link to={gameLink2}>
          <button>{scndMap.name}</button>
        </Link>
      </div>
    </main>
  );
}
