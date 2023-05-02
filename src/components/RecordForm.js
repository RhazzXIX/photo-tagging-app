import "../styles/RecordForm.css";
import parseToTimer from "../assists/parseToTimer";
import { setDoc, doc, collection } from "firebase/firestore";
import { database } from "../assists/fbConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordForm({ time, gameVer, version }) {
  const [userName, setUserName] = useState("");
  const [recordSent, setRecordSent] = useState(false);
  const navigate = useNavigate();
  let leaderBoardRef = "/photo-tagging-app/leaderboard";
  if (version === "kids")
    leaderBoardRef = "/photo-tagging-app/kids/leaderboard";

  async function sendDocs(e) {
    e.preventDefault();
    if (!recordSent) {
      const docRef = doc(collection(database, "leaderBoard"));

      const playerRecord = { userName, time, id: docRef.id, version: gameVer };

      await setDoc(docRef, playerRecord)
        .then(() => {
          setRecordSent(true);
          navigate(leaderBoardRef);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleInputName = (e) => {
    setUserName(e.target.value);
  };

  const { minutes, seconds, milliseconds } = parseToTimer(time);
  return (
    <section className="form">
      <form id="record" onSubmit={sendDocs}>
        <div className="timer">
          <p>Your time is:</p>
          <h4>
            {minutes}m {seconds}s {milliseconds}ms
          </h4>
        </div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={userName}
            onChange={handleInputName}
            required
          />
        </label>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
