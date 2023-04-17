import useGameData from "../assists/useGameData";
import "../styles/Selection.css";

export default function Selection(props) {
  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

  return (
    <section id="selection">
      <div className="card">
        <ul>
          {charSelection1.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} className="chars" />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={firstMap.miniUrl} alt={firstMap.name} />
        <button>{firstMap.name}</button>
      </div>
      <div className="card">
        <ul>
          {charSelection2.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} className="chars" />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={scndMap.miniUrl} alt={scndMap.name} />
        <button>{scndMap.name}</button>
      </div>
    </section>
  );
}
