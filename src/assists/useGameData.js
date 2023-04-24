import { useState, useEffect } from "react";
import { database, storage } from "./fbConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { getDoc, doc } from "firebase/firestore";
import createMapObj from "../assists/createMapObj";
import createCharObj from "./createCharObj";

export default function useGameData(props) {
  const [firstMap, setFirstMap] = useState({});
  const [scndMap, setScndMap] = useState({});
  const [charSelection1, setCharSelection1] = useState([]);
  const [charSelection2, setCharSelection2] = useState([]);

  const selection1Ref = doc(database, "game", "anime");
  const selection2Ref = doc(database, "game", "game");

  const getData = async () => {
    const charSelection1Data = [];
    const charSelection2DAta = [];

    const data1 = await getDoc(selection1Ref).then((response) =>
      response.data()
    );
    await getDownloadURL(ref(storage, data1.map.imgRef)).then(async (url) => {
      await getDownloadURL(ref(storage, data1.map.miniImgRef)).then(
        (miniUrl) => {
          setFirstMap(createMapObj(data1.map.name, url, miniUrl));
        }
      );
    });
    await getDownloadURL(ref(storage, data1.char1.imgRef)).then((url) => {
      const char = createCharObj(data1.char1.name, url, selection1Ref);
      charSelection1Data.push(char);
    });
    await getDownloadURL(ref(storage, data1.char2.imgRef)).then((url) => {
      const char = createCharObj(data1.char2.name, url, selection1Ref);
      charSelection1Data.push(char);
    });
    await getDownloadURL(ref(storage, data1.char3.imgRef)).then((url) => {
      const char = createCharObj(data1.char3.name, url, selection1Ref);
      charSelection1Data.push(char);
    });
    setCharSelection1(charSelection1Data);

    const data2 = await getDoc(selection2Ref).then((response) =>
      response.data()
    );

    await getDownloadURL(ref(storage, data2.map.imgRef)).then(async (url) => {
      await getDownloadURL(ref(storage, data2.map.miniImgRef)).then(
        (miniUrl) => {
          setScndMap(createMapObj(data2.map.name, url, miniUrl));
        }
      );
    });

    await getDownloadURL(ref(storage, data2.char1.imgRef)).then((url) => {
      const char = createCharObj(data2.char1.name, url, selection2Ref);
      charSelection2DAta.push(char);
    });
    await getDownloadURL(ref(storage, data2.char2.imgRef)).then((url) => {
      const char = createCharObj(data2.char2.name, url, selection2Ref);
      charSelection2DAta.push(char);
    });
    await getDownloadURL(ref(storage, data2.char3.imgRef)).then((url) => {
      const char = createCharObj(data2.char3.name, url, selection2Ref);
      charSelection2DAta.push(char);
    });
    setCharSelection2(charSelection2DAta);
  };

  useEffect(() => {
    getData();
  }, []);

  return { firstMap, scndMap, charSelection1, charSelection2 };
}
