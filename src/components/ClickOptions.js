import "../styles/ClickOptions.css";

const ClickOptions = (props) => {
  const { selections, position, handleClick } = props;

  let posY = 5;
  let posX = 5;
  if (position.targetPosY) posY += position.targetPosY;
  if (position.targetPosX) posX += position.targetPosX;
  if (posY >= 910) posY -= 174;
  if (posX >= 1680) posX -= 174;

  return (
    <ul
      id="charBtns"
      style={{
        position: "absolute",
        top: posY,
        left: posX,
      }}
    >
      {selections.map((character) => {
        if (character.isFound) return null;
        return (
          <li key={character.id}>
            <button onClick={handleClick.bind(character)}>
              {character.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ClickOptions;
