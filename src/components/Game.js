import { useState, useEffect } from "react";
import { database } from "../assists/fbConfig";
import { getDoc, doc, collection } from "firebase/firestore";

export default function Game(props) {
  const [firstMap, setFirstmap] = useState({});
  const [scndMap, setScndMap] = useState({});
  const [showFirstMap, setShowFirstMap] = useState(true);
  const [showScndMap, setShowScndmap] = useState(true);

  const selction1Ref = doc(database, "game", "anime");
  const selection2Ref = doc(database, "game", "game");

  const getData = async () => {
    const data1 = await getDoc(selction1Ref).then((response) =>
      response.data()
    );
    const data2 = await getDoc(selection2Ref).then((response) =>
      response.data()
    );
    setFirstmap(data1.map);
    setScndMap(data2.map);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
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
      {showFirstMap && (
        <section>
          <img src={firstMap.url} alt={firstMap.name} />
        </section>
      )}
      {showScndMap && (
        <section>
          <img src={scndMap.url} alt={scndMap.name} />
        </section>
      )}
    </main>
  );
}
