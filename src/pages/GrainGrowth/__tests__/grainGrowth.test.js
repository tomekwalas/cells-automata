import { nucleate, TYPES } from '../grainGrowth';

describe('Grain growth tests', () => {
  it('should nucleate as homogeneus', () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const expected = [[1, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 0, 1]];

    const data = {
      grainPerHeight: 3,
      grainPerWidth: 3
    };

    const actual = nucleate(mesh, TYPES.homogeneus, data);

    expect(actual).toEqual(expected);
  });

  it('should nucleate as random', () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const data = {
      grainCount: 4
    };

    const nextMesh = nucleate(mesh, TYPES.random, data);

    const actual = nextMesh
      .flat()
      .reduce((prev, curr) => (curr === 1 ? prev + 1 : prev), 0);

    expect(actual).toBe(4);
  });
});
