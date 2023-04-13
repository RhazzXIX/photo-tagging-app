const ClickOptions = (props) => {
  const { selections } = props;
  return (
    <ul>
      {selections.map((character) => {
        if (character.isFound) return null;
        return (
          <li key={character.id}>
            <button onClick={() => character.fn()}>{character.name}</button>
          </li>
        );
      })}
    </ul>
  );
};

export default ClickOptions;
