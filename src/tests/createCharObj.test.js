import createCharObj from "../assists/createCharObj";
import { getDoc } from "firebase/firestore";

jest.mock("firebase/firestore");
const fetchedData = {
  char1: {
    name: "char1",
    xMax: 370,
    xMin: 350,
    yMax: 580,
    yMin: 550,
  },
};

describe("createCharObj factory function", () => {
  beforeEach(() =>
    getDoc.mockResolvedValue({
      data() {
        return Promise.resolve(fetchedData);
      },
    })
  );
  it("Creates a character object", async () => {
    const testCharObj = createCharObj("char1", "testUrl", "testRef");
    expect(Object.keys(testCharObj)).toHaveLength(5);
    expect(testCharObj.name).toMatch("char1");
    expect(testCharObj.id).toBeTruthy();
    expect(typeof testCharObj.id).toMatch("string");
    expect(testCharObj.url).toMatch("testUrl");
    expect(typeof testCharObj.checkPosn).toMatch("function");
    expect(typeof testCharObj.isFound).toMatch("boolean");
  });

  test("The object method checkPosn alters the isFound property to true if the entered position is correct", async () => {
    const testCharObj = createCharObj("char1", "testUrl", "testRef");
    expect(testCharObj.isFound).toBe(false);
    await testCharObj.checkPosn(340, 570);
    expect(testCharObj.isFound).toBe(false);
    await testCharObj.checkPosn(360, 570);
    expect(testCharObj.isFound).toBe(true);
  });
});
