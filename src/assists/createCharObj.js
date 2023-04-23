import { getDoc } from "firebase/firestore";
import uniqid from "uniqid";

export default function createCharObj(name, url, ref) {
  async function checkPosn(posX, posY) {
    const data = await getDoc(ref).then((response) => {
      return response.data();
    });
    let inPosn = false;

    Object.keys(data).forEach((key) => {
      if (data[key].name === this.name) {
        if (posX >= data[key].xMin && posX <= data[key].xMax) {
          if (posY >= data[key].yMin && posY <= data[key].yMax) inPosn = true;
        }
      }
    });

    return inPosn;
  }
  const id = uniqid();

  return { name, id, url, checkPosn };
}
