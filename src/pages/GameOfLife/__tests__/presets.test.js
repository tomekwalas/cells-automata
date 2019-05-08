import { parse } from "../presets";

describe("Preset tests", () => {
  it("should parse raw preset", () => {
    console.log(parse);
    const rawPreset = `
      ...OO...
      ..O.O.O.
      ........`;

    const expected = [
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const actual = parse(rawPreset);

    expect(actual).toEqual(expected);
  });
});
