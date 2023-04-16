import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { storage } from "../assists/fbConfig";
import { useEffect, useRef, useState } from "react";
import "../styles/FrontPage.css";

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
      <div id="hContainer">
        <h1>Seek</h1>
        <h1>&</h1>
        <h1>Click</h1>
      </div>
      <Link to={"game"}>
        <button>Play!</button>
      </Link>
      <video width={"400px"} key={vidSrc} autoPlay loop muted>
        <source src={vidSrc} type="video/webm" data-testid='vidSrc'/>
      </video>
      {version !== "kids" ? (
        <p>
          -----&gt; &nbsp;
          <Link className="version" to="kids">
            Kids ver.
          </Link>
        </p>
      ) : (
        <Link className="version" to="/photo-tagging-app">
          Back to normal ver.
        </Link>
      )}
    </main>
  );
}
