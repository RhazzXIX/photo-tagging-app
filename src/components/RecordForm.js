import parseToTimer from "../assists/parseToTimer";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../assists/fbConfig";
import { useState } from "react";

export default function RecordForm(props) {
  const { time, gameVer } = props;
  const [userName, setUserName] = useState("");

  async function sendDocs(e) {
    e.preventDefault();
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
  }

  const handleInputName = (e) => {
    setUserName(e.target.value);
  };

  const { minutes, seconds, milliseconds } = parseToTimer(time);
  return (
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
  );
}
