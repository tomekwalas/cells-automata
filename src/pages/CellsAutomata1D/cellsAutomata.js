function getAllowedNumbers(rule) {
  const allowed = [];
  const binaryRule = rule
    .toString(2)
    .split("")
    .reverse();

  for (let i = 0; i < binaryRule.length; i++) {
    const binaryInt = parseInt(binaryRule[i], 10);
    if (!!binaryInt) {
      allowed.push(Math.pow(2, i));
    }
  }

  return allowed;
}
function getCellBasedOnNeighboors(number, allowedNumbers) {
  const numberDigit = parseInt(number, 2);

  const result = Math.pow(2, numberDigit);

  return allowedNumbers.some(a => a === result) ? 1 : 0;
}

export function generateMesh(width, height, rule) {
  let initial = [...Array(width).keys()].map(value => {
    return value === Math.floor(width / 2) ? 1 : 0;
  });

  const mesh = [initial];
  const allowedNumbers = getAllowedNumbers(rule);

  let previousCells = initial;

  for (let i = 0; i < height; i++) {
    const cells = [];
    for (let j = 0; j < width; j++) {
      const number = `${previousCells[(j - 1 + width) % width]}${
        previousCells[j % width]
      }${previousCells[(j + 1) % width]}`;
      const nextCell = getCellBasedOnNeighboors(number, allowedNumbers);
      cells.push(nextCell);
    }

    previousCells = cells;
    mesh.push(cells);
  }
  return mesh;
}
