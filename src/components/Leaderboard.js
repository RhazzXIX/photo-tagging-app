import parseToTimer from "../assists/parseToTimer";
import useGameData from "../assists/useGameData";
import { useState } from "react";

export default function Leaderboard({ gameVer }) {
  const [game, setGame] = useState("Anime Crossover");
  const [recordList, setRecordList] = useState([]);

  const { firstMap, scndMap } = useGameData();

  const timeToString = (time) => {
    const { minutes, seconds, milliseconds } = parseToTimer(time);

    return `${minutes}m ${seconds}s ${milliseconds}ms`;
  };

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
            const key = Object.keys(recordList);
            return (
              <li key={key[i]}>
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
