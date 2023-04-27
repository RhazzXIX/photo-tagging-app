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

export default function Leaderboard({ gameVer }) {
  const [game, setGame] = useState("Anime Crossover");
  const [recordList, setRecordList] = useState([]);

  const { firstMap, scndMap } = useGameData();

  const timeToString = (time) => {
    const { minutes, seconds, milliseconds } = parseToTimer(time);

    return `${minutes}m ${seconds}s ${milliseconds}ms`;
  };

  const getRecordList = async (game) => {
    const recordItems = [];

    let version;
    switch (game) {
      case "Anime Crossover":
        version = "animeX";
        break;
      case "Game Crossover":
        version = "gameX";
        break;
      default:
        version = null;
        break;
    }

    const queryRef = query(
      collection(database, "leaderBoard"),
      where("version", "==", version),
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
      recordItems.push(doc.data());
    });
    setRecordList(recordItems);
  };

  useEffect(() => {
    getRecordList(game);
  }, [game]);

  return (
    <main id="LeaderBoard">
      <header>
        <button>
          {firstMap && <img src={firstMap.miniUrl} alt={firstMap.name} />}
        </button>
        <button>
          {scndMap && <img src={scndMap.miniUrl} alt={scndMap.name} />}
        </button>
      </header>
      <h1>{game}</h1>
      <section className="list">
        <h4>Name:</h4>
        <h4>Time:</h4>
        <ol>
          {recordList.map((record, i) => {
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
