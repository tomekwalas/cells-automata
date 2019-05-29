import { randomNumber } from "../../../utils";
import { createCell } from "../Cell";
import { EDGE_CASE } from "../grainGrowth";

export default function withRadius(mesh, data) {
  const { grainCount, radius, edge } = data;

  const width = mesh[0].length;
  const height = mesh.length;
  const nextMesh = [...mesh.map(cells => [...cells])];
  const maxTries = 10;

  let id = 1;

  for (let i = 0; i < grainCount; i++) {
    let j = 0;
    while (j < maxTries) {
      const randomHeight = randomNumber(0, height);
      const randomWidth = randomNumber(0, width);

      if (
        nextMesh[randomHeight][randomWidth] === 0 &&
        !inRadius(nextMesh, randomHeight, randomWidth, radius, edge)
      ) {
        const cell = createCell({ id: id++, x: randomHeight, y: randomWidth });

        nextMesh[randomHeight][randomWidth] = cell;
        break;
      }
      j++;
    }
  }

  return nextMesh;
}

function inRadius(mesh, x, y, radius, edge) {
  const width = mesh[0].length;
  const height = mesh.length;
  if (edge === EDGE_CASE.absorb) {
    const startX = x - radius < 0 ? 0 : x - radius;
    const startY = y - radius < 0 ? 0 : y - radius;

    const stopX = x + radius + 1 > height ? height : x + radius + 1;
    const stopY = y + radius + 1 > width ? width : y + radius + 1;

    for (let i = startX; i < stopX; i++) {
      for (let j = startY; j < stopY; j++) {
        const cell = mesh[i][j];
        if (cell !== 0 && isPointInRadius(i, j, x, y, radius)) {
          return true;
        }
      }
    }
  } else {
    const startX = x - radius;
    const startY = y - radius;

    const stopX = x + radius;
    const stopY = y + radius;

    for (let i = startX; i <= stopX; i = i + 1) {
      for (let j = startY; j <= stopY; j = j + 1) {
        let cellX = i,
          cellY = j;

        if (i < 0) {
          cellX = (i + height) % height;
        }

        if (j < 0) {
          cellY = (j + width) % width;
        }

        if (i >= height) {
          cellX = i % height;
        }
        if (j >= width) {
          cellY = j % width;
        }

        const cell = mesh[cellX][cellY];
        if (cell !== 0 && isPointInRadius(i, j, x, y, radius)) {
          return true;
        }
      }
    }
  }

  return false;
}

function isPointInRadius(x, y, centerX, centerY, radius) {
  const isInRadius =
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2);

  return isInRadius;
}
