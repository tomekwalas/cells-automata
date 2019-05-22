import { grow, GROWTH, EDGE_CASE } from '../grainGrowth';

test('should grow with von neumann', () => {
  const c = {
    id: 1,
    color: 'white'
  };
  const mesh = [[0, 0, 0, 0], [0, 0, c, 0], [0, 0, 0, 0]];

  const expected = [[0, 0, c, 0], [0, c, c, c], [0, 0, c, 0]];

  const actual = grow(mesh, GROWTH.VON_NEUMANN, EDGE_CASE.periodic);

  console.log(actual);

  expect(actual).toEqual(expected);
});
