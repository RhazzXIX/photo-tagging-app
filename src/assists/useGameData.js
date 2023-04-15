import { useState, useEffect } from "react";
import { database, storage } from "./fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc } from "firebase/firestore";

export default function useGameData(props) {
  const [firstMap, setFirstmap] = useState({});
  const [scndMap, setScndMap] = useState({});
  const [charSelection, setCharSelection] = useState([]);

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

  return { firstMap, scndMap, charSelection };
}
