import "../styles/Leaderboard.css";
import parseToTimer from "../assists/parseToTimer";
import useGameData from "../assists/useGameData";
import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import { database } from "../assists/fbConfig";

export default function Leaderboard({ version }) {
  const [game, setGame] = useState("");
  const [recordList, setRecordList] = useState([]);

  const { firstMap, scndMap } = useGameData(version);

  const timeToString = (time) => {
    const { minutes, seconds, milliseconds } = parseToTimer(time);

    return `${minutes}m ${seconds}s ${milliseconds}ms`;
  };

  const getRecordList = async (game) => {
    const fetchedRecords = [];

    let gameVer;
    switch (game) {
      case "Anime Crossover":
        gameVer = "animeX";
        break;
      case "Game Crossover":
        gameVer = "gameX";
        break;
      case "Peppa Pig Tales":
        gameVer = "peppaPig";
        break;
      case "Robocar Poli":
        gameVer = "roboCar";
        break;
      default:
        gameVer = null;
        break;
    }

    const queryRef = query(
      collection(database, "leaderBoard"),
      where("version", "==", gameVer),
      orderBy("time", "asc"),
      limit(100)
    );
    let querySnapshot;
    await getDocs(queryRef)
      .then((resp) => {
        querySnapshot = resp;
      })
      .catch((e) => console.log(e));
    querySnapshot.forEach((doc) => {
      const fetchedData = doc.data();
      fetchedRecords.push(fetchedData);
    });

    setRecordList(fetchedRecords);
  };

  const showLeaderBoard = (e) => {
    setGame(e.target.dataset.game);
  };

  useEffect(() => {
    switch (version) {
      case 'kids':
        setGame("Peppa Pig Tales")
        break;
      default:
        setGame("Anime Crossover");
        break;
    }
  }, []);

  useEffect(() => {
    getRecordList(game);
  }, [game]);

  return (
    <main id="leaderBoard">
      <header>
        <button data-game={firstMap.name} onClick={showLeaderBoard}>
          {firstMap && (
            <img
              src={firstMap.miniUrl}
              alt={firstMap.name}
              data-game={firstMap.name}
            />
          )}
        </button>
        <button data-game={scndMap.name} onClick={showLeaderBoard}>
          {scndMap && (
            <img
              src={scndMap.miniUrl}
              alt={scndMap.name}
              data-game={scndMap.name}
            />
          )}
        </button>
      </header>
      <h1>{game}</h1>
      <section className="list">
        <h4>Rank:</h4>
        <h4>Name:</h4>
        <h4>Time:</h4>
        <ol>
          {recordList.map((record) => {
            return (
              <li key={record.id}>
                <p>{record.userName}</p>
                <p>{timeToString(record.time)}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
