import { inRadius } from "../grainGrowth";

describe("inRadius Tests", () => {
  it("should detect grain in radius with one grain", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0]];
    const actual = inRadius(mesh, 1, 3, 2);

    expect(actual).toBeTruthy();
  });
  /*  it("should detect no grain in radius", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    const actual = inRadius(mesh, 2, 2, 2);

    expect(actual).toBeFalsy();
  });

  it("should detect grain in radius with one grain", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0]];
    const actual = inRadius(mesh, 1, 3, 2);

    expect(actual).toBeTruthy();
  });

  it("should detect grain in radius with twp grain", () => {
    const mesh = [[0, 0, 0, 0, 1], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0]];
    const actual = inRadius(mesh, 1, 2, 2);

    expect(actual).toBeTruthy();
  });*/
});
