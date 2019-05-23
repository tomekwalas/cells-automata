import { EDGE_CASE, grow, GROWTH } from "../grainGrowth";

test("should grow one with von neumann with periodic border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const mesh = [[0, 0, 0, 0], [0, 0, 0, c], [0, 0, 0, 0]];

  const expected = [[0, 0, 0, c], [c, 0, c, c], [0, 0, 0, c]];

  const actual = grow(mesh, GROWTH.von_neumann, EDGE_CASE.periodic);

  expect(actual).toEqual(expected);
});

test("should grow one grain with von neumann with absorb border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const mesh = [[0, 0, 0, 0], [0, 0, 0, c], [0, 0, 0, 0]];

  const expected = [[0, 0, 0, c], [0, 0, c, c], [0, 0, 0, c]];

  const actual = grow(mesh, GROWTH.von_neumann, EDGE_CASE.absorb);

  expect(actual).toEqual(expected);
});

test("should grow two grains with von neumann with absorb border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const b = {
    id: 2,
    color: "red"
  };
  const mesh = [[0, 0, c, c], [0, b, 0, c], [b, b, b, 0], [0, b, 0, 0]];

  const expected = [[0, c, c, c], [b, b, c, c], [b, b, b, c], [b, b, b, 0]];

  const actual = grow(mesh, GROWTH.von_neumann, EDGE_CASE.absorb);

  expect(actual).toEqual(expected);
});

test("should grow one with moore with periodic border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const mesh = [[0, 0, 0, 0], [0, 0, 0, c], [0, 0, 0, 0]];

  const expected = [[c, 0, c, c], [c, 0, c, c], [c, 0, c, c]];

  const actual = grow(mesh, GROWTH.moore, EDGE_CASE.periodic);

  expect(actual).toEqual(expected);
});

test("should grow one grain with moore with absorb border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const mesh = [[0, 0, 0, 0], [0, 0, 0, c], [0, 0, 0, 0]];

  const expected = [[0, 0, c, c], [0, 0, c, c], [0, 0, c, c]];

  const actual = grow(mesh, GROWTH.moore, EDGE_CASE.absorb);

  expect(actual).toEqual(expected);
});

test("should grow two grains with moore with absorb border", () => {
  const c = {
    id: 1,
    color: "white"
  };
  const b = {
    id: 2,
    color: "red"
  };
  const mesh = [[0, 0, 0, c], [0, 0, 0, 0], [0, b, 0, 0], [0, 0, 0, 0]];

  const expected = [[0, 0, c, c], [b, b, c, c], [b, b, b, 0], [b, b, b, 0]];

  const actual = grow(mesh, GROWTH.moore, EDGE_CASE.absorb);

  expect(actual).toEqual(expected);
});
