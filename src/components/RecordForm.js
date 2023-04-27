import "../styles/RecordForm.css";
import parseToTimer from "../assists/parseToTimer";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../assists/fbConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordForm(props) {
  const { time, gameVer } = props;
  const [userName, setUserName] = useState("");
  const [recordSent, setRecordSent] = useState(false);
  const navigate = useNavigate();

  async function sendDocs(e) {
    e.preventDefault();
    if (!recordSent) {
      let totalRecord;
      const docRef = doc(database, "leaderBoard", gameVer);
      const leaderBoard = await getDoc(docRef).then((response) =>
        response.data()
      );

      if (!leaderBoard) {
        totalRecord = 0;
      } else {
        totalRecord = Object.keys(leaderBoard).length;
      }

      const playerRecord = {
        [`record${totalRecord}`]: { userName, time },
      };

      if (!leaderBoard) {
        await setDoc(docRef, playerRecord);
      } else {
        await updateDoc(docRef, playerRecord);
      }
      setRecordSent(true);
      navigate("/photo-tagging-app/leaderboard");
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
