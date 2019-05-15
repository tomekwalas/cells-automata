import { nucleate, TYPES, inRadius } from "../grainGrowth";

describe("Grain growth tests", () => {
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
      grainCount: 4,
      radius: 2
    };

    const nextMesh = nucleate(mesh, TYPES.random, data);

    const actual = nextMesh
      .flat()
      .reduce((prev, curr) => (curr !== 0 ? prev + 1 : prev), 0);

    expect(actual).toBe(4);
  });

  it("should nucleate as random with radius", () => {
    const mesh = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

    const data = {
      grainCount: 3,
      radius: 2
    };

    const nextMesh = nucleate(mesh, TYPES.withRadius, data);

    const actual = nextMesh
      .flat()
      .reduce((prev, curr) => (curr !== 0 ? prev + 1 : prev), 0);

    expect(actual === 2 || actual === 1).toBeTruthy();
  });
});
