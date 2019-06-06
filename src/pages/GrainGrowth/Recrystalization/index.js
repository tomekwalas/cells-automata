import { clone, randomNumber } from "../../../utils";
import { createCell } from "../Cell";
import { EDGE_CASE, GROWTH } from "../grainGrowth";
import { getMainCellAndNeibours } from "../Growth/base";

const A = 86710969050178.5;
const B = 9.41268203527779;

const DISPERSION_PERCENT = 0.2;

const BORDER_VALUE = 0.001;

function getRo(timestamp) {
  const ro = A / B + (1 - A / B) * Math.pow(Math.E, -B * timestamp);

  return ro;
}

function isOnBorder(cell, mesh) {
  const { neibours } = getMainCellAndNeibours({
    x: parseInt(cell.x, 10),
    y: parseInt(cell.y, 10),
    mesh,
    edge: EDGE_CASE.absorb,
    type: GROWTH.moore
  });

  return neibours.some(c => c.id !== cell.id);
}
let previousRo;

export function dislocationGun({ mesh, timestamp }) {
  const newMesh = clone(mesh);
  const height = newMesh.length;
  const width = newMesh[0].length;

  let deltaRo = undefined;
  const ro = getRo(timestamp);
  if (previousRo) {
    deltaRo = ro - previousRo;
    previousRo = ro;
  } else {
    deltaRo = ro;
    previousRo = ro;
  }

  let dislocationPool = deltaRo;
  let averageDisloactionPackage = deltaRo / (width * height);

  const critialRo = getRo(0.01 * 20) / (width * height);

  let dislocationPiece = averageDisloactionPackage * DISPERSION_PERCENT;

  for (let j = 0; j < height; j++) {
    for (let k = 0; k < width; k++) {
      const cell = newMesh[j][k];
      newMesh[j][k] = {
        ...cell,
        dislocationDensity: cell.dislocationDensity + dislocationPiece
      };
      dislocationPool -= dislocationPiece;
    }
  }

  while (dislocationPool > BORDER_VALUE) {
    const x = randomNumber(0, height);
    const y = randomNumber(0, width);

    const cell = newMesh[x][y];
    const probability = randomNumber(0, 100);
    const dislocationPack =
      averageDisloactionPackage * randomNumber(0, 1, false);
    if (isOnBorder(cell, newMesh) && probability > 20) {
      newMesh[x][y] = {
        ...cell,
        dislocationDensity: cell.dislocationDensity + dislocationPiece
      };

      dislocationPool -= dislocationPack;
    } else if (!isOnBorder(cell, newMesh) && probability <= 20) {
      newMesh[x][y] = {
        ...cell,
        dislocationDensity: cell.dislocationDensity + dislocationPiece
      };

      dislocationPool -= dislocationPack;
    }
  }

  //zarodkowanie
  for (let j = 0; j < height; j++) {
    for (let k = 0; k < width; k++) {
      const cell = newMesh[j][k];
      if (cell.dislocationDensity >= critialRo && isOnBorder(cell, newMesh)) {
        newMesh[j][k] = createCell({
          id: randomNumber(0, j * k) * j * k,
          x: j,
          y: k,
          recrystalized: timestamp
        });
      }
    }
  }

  // rozrost

  for (let j = 0; j < height; j++) {
    for (let k = 0; k < width; k++) {
      const cell = newMesh[j][k];
      const prevRow = j - 1 < 0 ? 0 : j - 1;
      const currentRow = j;
      const nextRow = j + 1 >= height ? height - 1 : j + 1;

      const prevCell = k - 1 < 0 ? 0 : k - 1;
      const currentCell = k;
      const nextCell = k + 1 >= width ? width - 1 : k + 1;
      const a1 = mesh[prevRow][currentCell];

      const b1 = mesh[currentRow][prevCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][currentCell];

      const neibours = [a1, b1, b3, c1];

      const recrystalizedCell = neibours.find(
        n => n.recrystalized === timestamp - 0.01
      );

      if (!recrystalizedCell) {
        continue;
      }

      if (neibours.some(n => n.dislocationDensity > cell.dislocationDensity)) {
        continue;
      }

      newMesh[j][k] = {
        ...recrystalizedCell,
        x: k,
        y: k,
        dislocationDensity: 0
      };
    }
  }

  return newMesh;
}
