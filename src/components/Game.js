import "../styles/Game.css";
import useGameData from "../assists/useGameData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClickOptions from "./ClickOptions";
import parseToTimer from "../assists/parseToTimer";

export default function Game(props) {
  const { gameVer } = useParams();
  const [showLoading, setShowLoading] = useState(true);
  const [loading, setLoading] = useState("Loading.");
  const [showButtons, setShowButtons] = useState(false);
  const [targetPosX, setTargetPosX] = useState(915);
  const [targetPosY, setTargetPosY] = useState(440);
  const [countTime, setCountTime] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [gameMap, setGameMap] = useState({});
  const [charSelection, setCharSelection] = useState([]);
  const [notice, setNotice] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

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
    setRunTimer(true);
  };

  const getPosition = (e) => {
    const xPos = e.nativeEvent.offsetX;
    const yPos = e.nativeEvent.offsetY;
    setTargetPosX(xPos);
    setTargetPosY(yPos);
    if (showButtons) {
      setShowButtons(false);
      return;
    }
    setShowButtons(true);
  };

  // const getMousePosition = (e) => {
  //   const xPos = e.nativeEvent.offsetX
  //   const yPos = e.nativeEvent.offsetY
  //   setTargetPosX(xPos)
  //   setTargetPosY(yPos)
  // }

  async function selectChar(e) {
    let message = `${this.name} was not found`;
    await this.checkPosn(targetPosX, targetPosY);
    if (this.isFound) {
      message = `You found ${this.name}`;
    }
    setNotice(message);
    setShowNotice(true);
  }

  useEffect(() => {
    const editLoadingInterval = setInterval(() => {
      editLoading();
    }, 1000);
    if (!showLoading) clearInterval(editLoadingInterval);
    return () => {
      clearInterval(editLoadingInterval);
    };
  }, [loading]);

  useEffect(() => {
    switch (gameVer) {
      case "animeX":
        setGameMap(firstMap);
        setCharSelection(charSelection1);
        break;
      case "gameX":
        setGameMap(scndMap);
        setCharSelection(charSelection2);
        break;
      default:
        setGameMap({});
        setCharSelection([]);
    }
  }, [firstMap, scndMap, charSelection1, charSelection2]);

  useEffect(() => {
    if (showNotice) setTimeout(() => setShowNotice(false), 3000);
    if (
      charSelection.every((char) => {
        return char.isFound;
      })
    ) {
      setRunTimer(false);
    }
  }, [showNotice]);

  useEffect(() => {
    let gameTimer;
    if (!runTimer) {
      clearInterval(gameTimer);
    }
    if (runTimer) {
      gameTimer = setInterval(() => {
        setCountTime(countTime + 1);
      }, 1);
    }
    return () => {
      clearInterval(gameTimer);
    };
  }, [countTime, runTimer]);

  const { minutes, seconds, milliSeconds } = parseToTimer(countTime);

  return (
    <main id="game">
      <header>
        <div className="timer">
          <p>{minutes}m</p>
          <p>{seconds}s</p>
          <p>{milliSeconds}ms</p>
        </div>
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
        {showNotice && <h2>{notice}</h2>}
      </header>
      {gameMap && (
        <section
          id="map"
          onClick={getPosition}
          data-testid="map"
          //  onMouseOver={getMousePosition}
        >
          <img src={gameMap.url} alt={gameMap.name} />
          {/* <div
            id="target"
            style={{
              position: "absolute",
              left: targetPosX,
              top: targetPosY,
            }}
          >✛</div>  */}
          {showButtons && (
            <ClickOptions
              selections={charSelection}
              position={{ targetPosX, targetPosY }}
              handleClick={selectChar}
            />
          )}
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
