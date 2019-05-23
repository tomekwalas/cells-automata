import { nucleate, TYPES } from "../grainGrowth";

describe("Nucleate tests", () => {
  it("should nucleate as homogeneus", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const expected = [
      [
        { id: 1, color: "white" },
        0,
        { id: 2, color: "white" },
        0,
        { id: 3, color: "white" }
      ],
      [
        { id: 4, color: "white" },
        0,
        { id: 5, color: "white" },
        0,
        { id: 6, color: "white" }
      ],
      [
        { id: 7, color: "white" },
        0,
        { id: 8, color: "white" },
        0,
        { id: 9, color: "white" }
      ]
    ];

    const data = {
      grainPerHeight: 3,
      grainPerWidth: 3,
      color: "white"
    };

    const actual = nucleate(mesh, TYPES.homogeneus, data);

    expect(actual).toEqual(expected);
  });

  it("should nucleate as random", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const data = {
      grainCount: 4
    };

    const nextMesh = nucleate(mesh, TYPES.random, data);

    let grains = 0;

    nextMesh.forEach(cells =>
      cells.forEach(c => {
        if (c !== 0) {
          grains++;
        }
      })
    );

    expect(grains).toBe(4);
  });

  it("should nucleate as random with radius", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const data = {
      grainCount: 3,
      radius: 3
    };

    const nextMesh = nucleate(mesh, TYPES.withRadius, data);

    let grains = 0;

    nextMesh.forEach(cells =>
      cells.forEach(c => {
        if (c !== 0) {
          grains++;
        }
      })
    );

    expect(grains === 2 || grains === 1).toBeTruthy();
  });
});
