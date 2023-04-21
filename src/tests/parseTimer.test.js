import parseToTimer from "../assists/parseToTimer";

describe("parseTimer helper function", () => {
  it("parses entered number to milliseconds, seconds ,minutes", () => {
    expect(parseToTimer(100)).toEqual({
      minutes: 0,
      seconds: 0,
      milliSeconds: 100,
    });
    expect(parseToTimer(1000)).toEqual({
      minutes: 0,
      seconds: 1,
      milliSeconds: 0,
    });
    expect(parseToTimer(60000)).toEqual({
      minutes: 1,
      seconds: 0,
      milliSeconds: 0,
    });
    expect(parseToTimer(60001)).toEqual({
      minutes: 1,
      seconds: 0,
      milliSeconds: 1,
    });
    expect(parseToTimer(61100)).toEqual({
      minutes: 1,
      seconds: 1,
      milliSeconds: 100,
    });
  });
});
