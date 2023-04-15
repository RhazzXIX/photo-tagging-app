import { useState, useEffect } from "react";
import { database, storage } from "./fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc } from "firebase/firestore";

export default function useGameData(props) {
  const [firstMap, setFirstmap] = useState({});
  const [scndMap, setScndMap] = useState({});
  const [charSelection1, setCharSelection1] = useState([]);
  const [charSelection2, setCharSelection2] = useState([]);

  const selection1Ref = doc(database, "game", "anime");
  const selection2Ref = doc(database, "game", "game");

  const getData = async () => {
    const firstMapData = {};
    const scndMapData = {};
    const char1 = {};
    const char2 = {};
    const char3 = {};
    const char4 = {};
    const char5 = {};
    const char6 = {};

    const data1 = await getDoc(selection1Ref).then((response) =>
      response.data()
    );
    firstMapData.name = data1.map.name;
    await getDownloadURL(ref(storage, data1.map.imgRef)).then(
      (url) => (firstMapData.url = url)
    );
    setFirstmap(firstMapData);
    char1.name = data1.char1.name;
    await getDownloadURL(ref(storage, data1.char1.imgRef)).then(
      (url) => (char1.url = url)
    );
    char2.name = data1.char2.name;
    await getDownloadURL(ref(storage, data1.char2.imgRef)).then(
      (url) => (char2.url = url)
    );
    char3.name = data1.char3.name;
    await getDownloadURL(ref(storage, data1.char3.imgRef)).then(
      (url) => (char3.url = url)
    );
    setCharSelection1([char1, char2, char3]);

    const data2 = await getDoc(selection2Ref).then((response) =>
      response.data()
    );
    scndMapData.name = data2.map.name;
    await getDownloadURL(ref(storage, data2.map.imgRef)).then(
      (url) => (scndMapData.url = url)
    );
    setScndMap(scndMapData);
    char4.name = data2.char1.name;
    await getDownloadURL(ref(storage, data2.char1.imgRef)).then(
      (url) => (char4.url = url)
    );
    char5.name = data2.char2.name;
    await getDownloadURL(ref(storage, data2.char2.imgRef)).then(
      (url) => (char5.url = url)
    );
    char6.name = data2.char3.name;
    await getDownloadURL(ref(storage, data2.char3.imgRef)).then(
      (url) => (char6.url = url)
    );
    setCharSelection2([char4, char5, char6]);
  };

  useEffect(() => {
    getData();
  }, []);

  return { firstMap, scndMap, charSelection1, charSelection2 };
}
