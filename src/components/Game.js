import { useState, useEffect } from "react";
import { database, storage } from "../assists/fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc, collection } from "firebase/firestore";

export default function Game(props) {
  const [firstMap, setFirstmap] = useState({});
  const [scndMap, setScndMap] = useState({});
  const [showFirstMap, setShowFirstMap] = useState(true);
  const [showScndMap, setShowScndmap] = useState(true);

  const selction1Ref = doc(database, "game", "anime");
  const selection2Ref = doc(database, "game", "game");

  const getData = async () => {
    const firstMapData = {};
    const scndMapData = {};
    const data1 = await getDoc(selction1Ref).then((response) =>
      response.data()
    );
    firstMapData.name = data1.map.name;
    await getDownloadURL(ref(storage, data1.map.imgRef)).then(
      (url) => (firstMapData.url = url)
    );
    setFirstmap(firstMapData);
    const data2 = await getDoc(selection2Ref).then((response) =>
      response.data()
    );
    scndMapData.name = data2.map.name;
    await getDownloadURL(ref(storage, data2.map.imgRef)).then(
      (url) => (scndMapData.url = url)
    );
    setScndMap(scndMapData);
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
