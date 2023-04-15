import useGameData from "../assists/useGameData";

export default function Selection(props) {
  const { firstMap, scndMap, charSelection1, charSelection2 } = useGameData();

  return (
    <section>
      <div>
        <ul>
          {charSelection1.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={firstMap.url} alt={firstMap.name} />
        <p>{firstMap.name}</p>
      </div>
      <div>
        <ul>
          {charSelection2.map((char) => {
            return (
              <li key={char.name}>
                <img src={char.url} alt={char.name} />
                <p>{char.name}</p>
              </li>
            );
          })}
        </ul>
        <img src={scndMap.url} alt={scndMap.name} />
        <p>{scndMap.name}</p>
      </div>
    </section>
  );
}
