import { useState, useEffect } from "react";
import { database, storage } from "../assists/fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc, collection } from "firebase/firestore";
import Selection from "./Selection";
import useGameData from "../assists/useGameData";
import "../styles/Game.css";

export default function Game(props) {
  const [showFirstMap, setShowFirstMap] = useState(true);
  const [showScndMap, setShowScndmap] = useState(false);
  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

  return (
    <main id="game">
      {showFirstMap && (
        <section className="map">
          <header>
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
          </header>
          <img src={firstMap.url} alt={firstMap.name} />
        </section>
      )}
      {showScndMap && (
        <section className="map">
          <header>
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
          </header>
          <img src={scndMap.url} alt={scndMap.name} />
        </section>
      )}

      {/* <Selection /> */}
    </main>
  );
}
