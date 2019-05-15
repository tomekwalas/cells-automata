import { createCell } from "./Cell";
import { randomNumber } from "../../utils";

export const TYPES = {
  homogeneus: "homogeneus",
  random: "random",
  withRadius: "withRadius"
};

export function nucleate(mesh, type, data) {
  switch (type) {
    case TYPES.homogeneus:
      return homogeneus(mesh, data);
    case TYPES.random:
      return random(mesh, data);
    case TYPES.withRadius:
      return withRadius(mesh, data);
  }
}

function homogeneus(mesh, data) {
  const { grainPerWidth, grainPerHeight, color } = data;

  const width = mesh[0].length;
  const height = mesh.length;

  const heightLeap = Math.ceil(height / grainPerHeight);
  const widthtLeap = Math.ceil(width / grainPerWidth);

  const nextMesh = [...mesh.map(cells => [...cells])];
  let id = 1;
  for (let i = 0; i < height; i = i + heightLeap) {
    for (let j = 0; j < width; j = j + widthtLeap) {
      const cell = createCell(id++, color);
      nextMesh[i][j] = cell;
    }
  }

  return nextMesh;
}

function random(mesh, data) {
  const { grainCount } = data;

  const width = mesh[0].length;
  const height = mesh.length;
  const nextMesh = [...mesh.map(cells => [...cells])];
  const maxTries = 10;

  for (let i = 0; i < grainCount; i++) {
    let j = 0;
    let id = 1;
    while (j < maxTries) {
      const randomHeight = randomNumber(0, height);
      const randomWidth = randomNumber(0, width);

      if (nextMesh[randomHeight][randomWidth] === 0) {
        const cell = createCell(id++);
        nextMesh[randomHeight][randomWidth] = cell;
        break;
      }
      j++;
    }
  }

  return nextMesh;
}

export function inRadius(mesh, x, y, radius) {
  const width = mesh[0].length;
  const height = mesh.length;

  const startX = x - radius < 0 ? 0 : x - radius;
  const startY = y - radius < 0 ? 0 : y - radius;

  const stopX = x + radius + 1 > height ? height : x + radius + 1;
  const stopY = y + radius + 1 > width ? width : y + radius + 1;

  for (let i = startX; i < stopX; i++) {
    for (let j = startY; j < stopY; j++) {
      if (mesh[i][j] !== 0) {
        return true;
      }
    }
  }

  return false;
}

function withRadius(mesh, data) {
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
        const cell = createCell(id++);

        nextMesh[randomHeight][randomWidth] = cell;
        break;
      }
      j++;
    }
  }

  return nextMesh;
}
