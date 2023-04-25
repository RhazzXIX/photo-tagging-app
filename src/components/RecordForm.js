import parseToTimer from "../assists/parseToTimer";

export default function RecordForm(props) {
  const { minutes, seconds, milliseconds } = parseToTimer(0);
  return (
    <form id="record">
      <div className="timer">
        <p>Your time is:</p>
        <h4>
          {minutes}m {seconds}s {milliseconds}ms
        </h4>
      </div>
      <label htmlFor="name">
        Name:
        <input type="text" id="name" />
      </label>
      <button type="submit" className="submit">
        Submit
      </button>
    </form>
  );
}
