import { useState, useEffect } from "react";
import { database, storage } from "../assists/fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc, collection } from "firebase/firestore";
import Selection from "./Selection";
import useGameData from "../assists/useGameData";

export default function Game(props) {
  const [showFirstMap, setShowFirstMap] = useState(true);
  const [showScndMap, setShowScndmap] = useState(true);
  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

  return (
    <main>
      <Selection />
      {showFirstMap && (
        <section>
          <header>
            <ul>
              {charSelection1.map((char) => {
                return (
                  <li key={char.name}>
                    <img src={char.url} alt={char.name} />
                    <p>{char.name}</p>
                  </li>
                );
              })}
            </ul>
          </header>
          <img src={firstMap.url} alt={firstMap.name} />
        </section>
      )}
      {showScndMap && (
        <section>
          <header>
            <ul>
              {charSelection2.map((char) => {
                return (
                  <li key={char.name}>
                    <img src={char.url} alt={char.name} />
                    <p>{char.name}</p>
                  </li>
                );
              })}
            </ul>
          </header>
          <img src={scndMap.url} alt={scndMap.name} />
        </section>
      )}
    </main>
  );
}
