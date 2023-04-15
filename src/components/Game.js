import { useState, useEffect } from "react";
import { database, storage } from "../assists/fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc, collection } from "firebase/firestore";
import Selection from "./Selection";
import useGameData from "../assists/useGameData";

export default function Game(props) {
  const [showFirstMap, setShowFirstMap] = useState(true);
  const [showScndMap, setShowScndmap] = useState(true);
  const { firstMap, scndMap } = useGameData();

  return (
    <main>
      <Selection />
      {showFirstMap && (
        <section>
          <header>
            <ul>
              <li>
                <img src="" alt="" />
              </li>
              <li>
                <img src="" alt="" />
              </li>
              <li>
                <img src="" alt="" />
              </li>
            </ul>
          </header>
          <img src={firstMap.url} alt={firstMap.name} />
        </section>
      )}
      {showScndMap && (
        <section>
          <header>
            <ul>
              <li>
                <img src="" alt="" />
              </li>
              <li>
                <img src="" alt="" />
              </li>
              <li>
                <img src="" alt="" />
              </li>
            </ul>
          </header>
          <img src={scndMap.url} alt={scndMap.name} />
        </section>
      )}
    </main>
  );
}
