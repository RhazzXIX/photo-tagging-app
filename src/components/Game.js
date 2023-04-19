import "../styles/Game.css";
import useGameData from "../assists/useGameData";
import { useParams } from "react-router-dom";

export default function Game(props) {
  const { gameVer } = useParams();

  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

  let map, charSelection;

  switch (gameVer) {
    case "animeX":
      map = firstMap;
      charSelection = charSelection1;
      break;
    case "gameX":
      map = scndMap;
      charSelection = charSelection2;
      break;
    default:
      map = null;
      charSelection = null;
  }

  return (
    <main id="game">
      <header>
        <ul>
          {charSelection &&
            charSelection.map((char) => {
              return (
                <li key={char.name}>
                  <img src={char.url} alt={char.name} className="chars" />
                  <p>{char.name}</p>
                </li>
              );
            })}
        </ul>
      </header>
      {map && <img src={map.url} alt={map.name} />}
    </main>
  );
}
