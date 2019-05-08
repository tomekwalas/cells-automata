export function parse(rawPreset) {
  const parsedPreset = rawPreset.split("\n").map(row => {
    return row
      .replace(/O/g, 1)
      .split(".")
      .join(0)
      .trim()
      .split("");
  });

  return parsedPreset
    .filter(cells => !!cells.length)
    .map(cells => cells.map(val => parseInt(val, 10)));
}

export function getPreset(name) {
  return parse(presets[name]);
}

export function getPresets() {
  return [
    {
      name: "Gun",
      value: "gun"
    },
    {
      name: "Oscylator",
      value: "oscilator"
    },
    {
      name: "Glider",
      value: "glider"
    },
    {
      name: "Constant",
      value: "constant"
    }
  ];
}

const presets = {
  gun: `
........................O...........
......................O.O...........
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO..............
OO........O...O.OO....O.O...........
..........O.....O.......O...........
...........O...O....................
............OO......................`,
  oscilator: `
....................................
........O...........................
........O...........................
........O...........................
....................................
....................................`,
  glider: `
....................................
....................................
................OO.................
...............OO...................
.................O..................
....................................`,
  constant: `
....................................
.........O..........................
........O.O.........................
........O.O.........................
.........O..........................
....................................`
};
