import { randomNumber } from "../../../utils";
import { createCell } from "../Cell";

export default function withRadius(mesh, data) {
  const { grainCount, radius } = data;

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
        !inRadius(nextMesh, randomHeight, randomWidth, radius)
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

function inRadius(mesh, x, y, radius) {
  const width = mesh[0].length;
  const height = mesh.length;

  const startX = x - radius < 0 ? 0 : x - radius;
  const startY = y - radius < 0 ? 0 : y - radius;

  const stopX = x + radius + 1 > height ? height : x + radius + 1;
  const stopY = y + radius + 1 > width ? width : y + radius + 1;

  for (let i = startX; i < stopX; i++) {
    for (let j = startY; j < stopY; j++) {
      if (mesh[i][j] !== 0 && isPointInRadius(i, j, x, y, radius)) {
        return true;
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
