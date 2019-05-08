import { determineCellState, iterate, getCell } from "../game";

describe("Game tests", () => {
  it("should alive cell be dead with 1 neibour", () => {
    const mesh = [[0, 0, 0], [0, 1, 0], [1, 0, 0]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(0);
  });

  it("should alive cell be dead with 4 neibour", () => {
    const mesh = [[1, 0, 1], [0, 1, 0], [1, 1, 0]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(0);
  });

  it("should dead cell with 3 neibour be alive", () => {
    const mesh = [[1, 0, 0], [1, 0, 0], [1, 0, 0]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(1);
  });

  it("should dead cell with 2 neibour be dead", () => {
    const mesh = [[1, 0, 1], [0, 0, 0], [0, 0, 0]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(0);
  });

  it("should alive cell be alive with 2 neibour", () => {
    const mesh = [[0, 0, 1], [0, 1, 0], [1, 0, 0]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(1);
  });

  it("should alive cell be alive with 3 neibour", () => {
    const mesh = [[0, 0, 1], [0, 0, 0], [1, 0, 1]];

    const actual = determineCellState(mesh);

    expect(actual).toBe(1);
  });

  it("should get proper cells", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0]];
    const expected = [[0, 1, 1], [0, 0, 0], [0, 1, 1]];

    const actual = getCell(0, 1, mesh, mesh[0]);

    expect(actual).toEqual(expected);
  });

  it("should not move", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 1, 1, 0, 0], [0, 1, 1, 0, 0]];

    const actual = iterate(mesh);

    expect(actual).toEqual(mesh);
  });

  it("should change position from horizontal to vertical", () => {
    const mesh = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    const expected = [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ];

    const actual = iterate(mesh);

    expect(actual).toEqual(expected);
  });

  it("should load gun", () => {});
});
