import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { storage } from "../assists/fbConfig";
import { useEffect, useRef, useState } from "react";

export default function FrontPage(props) {
  const { version } = props;
  const [vidSrc, setVidSrc] = useState();
  let storageVidLoc = "gameMap/chopper-hiding.webm";

  if (version) storageVidLoc = "kidsMap/george hiding.webm";

  useEffect(() => {
    const vidRef = ref(storage, storageVidLoc);
    getDownloadURL(vidRef).then((url) => {
      setVidSrc(url);
    });
  }, []);

  return (
    <main id="FrontPage">
      <h1>Seek & Click</h1>
      <button>Play!</button>
      <video width={"360px"} key={vidSrc} autoPlay loop muted>
        <source src={vidSrc} type="video/webm" />
      </video>
      {version !== "kids" ? (
        <p>
          -----&gt; &nbsp;
          <Link to="kids">Kids ver.</Link>
        </p>
      ) : (
        <Link to="/photo-tagging-app">Back to normal ver.</Link>
      )}
    </main>
  );
}
