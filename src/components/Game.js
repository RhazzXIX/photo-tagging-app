import "../styles/Game.css";
import useGameData from "../assists/useGameData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClickOptions from './ClickOptions'

export default function Game(props) {
  const { gameVer } = useParams();
  const [showLoading, setShowLoading] = useState(true);
  const [loading, setLoading] = useState("Loading.");
  const [showButtons, setShowButtons] = useState(false);
  const [targetPosX, setTargetPosX] = useState(915);
  const [targetPosY, setTargetPosY] = useState(440);

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

  const editLoading = () => {
    switch (loading) {
      case "Loading.":
        setLoading("Loading..");
        break;
      case "Loading..":
        setLoading("Loading...");
        break;
      default:
        setLoading("Loading.");
    }
  };

  const removeLoading = (e) => {
    setShowLoading(false);
  };

  const handleClick = (e) => {
    const xPos = e.nativeEvent.offsetX
    const yPos = e.nativeEvent.offsetY
    setTargetPosX(xPos)
    setTargetPosY(yPos)
    if (showButtons) {
      setShowButtons(false)
      return
    }
    setShowButtons(true);
  };

  // const getMousePosition = (e) => {
  //   const xPos = e.nativeEvent.offsetX 
  //   const yPos = e.nativeEvent.offsetY
  //   setTargetPosX(xPos)
  //   setTargetPosY(yPos)
  // }

  useEffect(() => {
    const editLoadingInterval = setInterval(() => {
      editLoading();
    }, 1000);
    if (!showLoading) clearInterval(editLoadingInterval);
    return () => {
      clearInterval(editLoadingInterval);
    };
  }, [loading]);

  return (
    <main id="game">
      <header>
        <ul>
          {charSelection &&
            charSelection.map((char, i) => {
              if (i === charSelection.length - 1)
                return (
                  <li key={char.id}>
                    <img
                      src={char.url}
                      alt={char.name}
                      className="chars"
                      onLoad={removeLoading}
                    />
                    <p>{char.name}</p>
                  </li>
                );
              return (
                <li key={char.id}>
                  <img src={char.url} alt={char.name} className="chars" />
                  <p>{char.name}</p>
                </li>
              );
            })}
        </ul>
      </header>
      {map && (
        <section id="map" onClick={handleClick} data-testid='map'
        //  onMouseOver={getMousePosition}
         >
          <img src={map.url} alt={map.name} />
           {/* <div
            id="target"
            style={{
              position: "absolute",
              left: targetPosX,
              top: targetPosY,
            }}
          >✛</div>  */}
      {showButtons &&
        <ClickOptions selections={charSelection} position={{targetPosX, targetPosY}}/>
      }
        </section>
      )}
      {showLoading && (
        <section id="loading">
          <h1>{loading}</h1>
        </section>
      )}
    </main>
  );
}
