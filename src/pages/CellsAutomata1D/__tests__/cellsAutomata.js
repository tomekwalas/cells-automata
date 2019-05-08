import { generateMesh } from "../cellsAutomata";
test("generate mesh with 30 rule properly", () => {
  const expected = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 0]
  ];
  const actual = generateMesh(7, 2, 30);

  expect(actual).toEqual(expected);
});

test("generate mesh with 60 rule properly", () => {
  const expected = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0]
  ];
  const actual = generateMesh(7, 4, 60);

  expect(actual).toEqual(expected);
});
