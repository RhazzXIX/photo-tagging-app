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
    expect(Object.keys(testCharObj)).toHaveLength(4);
    expect(testCharObj.name).toMatch("char1");
    expect(testCharObj.id).toBeTruthy();
    expect(typeof testCharObj.id).toMatch("string");
    expect(testCharObj.url).toMatch("testUrl");
    expect(await testCharObj.checkPosn()).toBe(false);
    expect(typeof testCharObj.checkPosn).toMatch("function");
  });

  test("The char object method return true if the position entered are within the fetched position", async () => {
    const testCharObj = createCharObj("char1", "testUrl", "testRef");
    expect(await testCharObj.checkPosn(340, 570)).toBe(false);
    expect(await testCharObj.checkPosn(360, 570)).toBe(true);
  });
});
