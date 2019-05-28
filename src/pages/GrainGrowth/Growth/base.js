import { randomNumber } from "../../../utils";
import { EDGE_CASE, GROWTH } from "../grainGrowth";

export default function base(mesh, edge, type, data) {
  const nextMesh = [...mesh.map(cells => [...cells])];

  const height = mesh.length;
  const width = mesh[0].length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const { neibours, mainCell } = getMainCellAndNeibours({
        x: i,
        y: j,
        mesh,
        edge,
        type,
        data
      });

      if (!neibours.some(n => n !== 0)) {
        continue;
      }

      if (mainCell.value !== 0) {
        continue;
      }

      const domimantCell = getDominantCell(neibours);

      const { x, y } = mainCell;

      nextMesh[x][y] = {
        ...domimantCell,
        x: parseInt(x, 10),
        y: parseInt(y, 10)
      };
    }
  }
  return nextMesh;
}

export function getMainCellAndNeibours({ x, y, mesh, edge, type, data }) {
  const height = mesh.length;
  const width = mesh[0].length;

  const row = mesh[x];
  let prevRow, currentRow, nextRow, prevCell, currentCell, nextCell;
  if (edge === EDGE_CASE.periodic) {
    prevRow = (x - 1 + mesh.length) % mesh.length;
    currentRow = x % mesh.length;
    nextRow = (x + 1) % mesh.length;

    prevCell = (y - 1 + row.length) % row.length;
    currentCell = y % row.length;
    nextCell = (y + 1) % row.length;
  } else {
    prevRow = x - 1 < 0 ? 0 : x - 1;
    currentRow = x;
    nextRow = x + 1 >= height ? height - 1 : x + 1;

    prevCell = y - 1 < 0 ? 0 : y - 1;
    currentCell = y;
    nextCell = y + 1 >= width ? width - 1 : y + 1;
  }

  switch (type) {
    case GROWTH.moore: {
      const a1 = mesh[prevRow][prevCell];
      const a2 = mesh[prevRow][currentCell];
      const a3 = mesh[prevRow][nextCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][prevCell];
      const c2 = mesh[nextRow][currentCell];
      const c3 = mesh[nextRow][nextCell];

      const neibours = [a1, a2, a3, b1, b3, c1, c2, c3];

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }
    case GROWTH.von_neumann: {
      const a1 = mesh[prevRow][currentCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][currentCell];

      const neibours = [a1, b1, b3, c1];

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }
    case GROWTH.pentagonal: {
      const a1 = mesh[prevRow][prevCell];
      const a2 = mesh[prevRow][currentCell];
      const a3 = mesh[prevRow][nextCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][prevCell];
      const c2 = mesh[nextRow][currentCell];
      const c3 = mesh[nextRow][nextCell];

      let neibours = [];

      const random = randomNumber(0, 3);

      switch (random) {
        case 0:
          neibours = [a1, a2, b1, c1, c2];
          break;
        case 1:
          neibours = [a2, a3, b3, c2, c3];
          break;
        case 2:
          neibours = [b1, b3, c1, c2, c3];
          break;
        case 3:
          neibours = [a1, a2, a3, b1, b3];
          break;
      }

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }
    case GROWTH.hexagonalLeft: {
      const a2 = mesh[prevRow][currentCell];
      const a3 = mesh[prevRow][nextCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][prevCell];
      const c2 = mesh[nextRow][currentCell];

      let neibours = [a2, a3, b1, b3, c1, c2];

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }

    case GROWTH.hexagonalRight: {
      const a1 = mesh[prevRow][prevCell];
      const a2 = mesh[prevRow][currentCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c2 = mesh[nextRow][currentCell];
      const c3 = mesh[nextRow][nextCell];

      let neibours = [a1, a2, b1, b3, c2, c3];

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }

    case GROWTH.hexagonalRandom: {
      const a1 = mesh[prevRow][prevCell];
      const a2 = mesh[prevRow][currentCell];
      const a3 = mesh[prevRow][nextCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][prevCell];
      const c2 = mesh[nextRow][currentCell];
      const c3 = mesh[nextRow][nextCell];

      let neibours = [];

      const random = randomNumber(0, 1);

      switch (random) {
        case 0:
          neibours = [a2, a3, b1, b3, c1, c2];
          break;
        case 1:
          neibours = [a1, a2, b1, b3, c2, c3];
          break;
      }

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: b2
        }
      };
    }

    case GROWTH.withRadius: {
      const { radius } = data;
      const neibours = inRadiusNeibours(mesh, currentRow, currentCell, radius);

      return {
        neibours,
        mainCell: {
          x: currentRow,
          y: currentCell,
          value: mesh[currentRow][currentCell]
        }
      };
    }
  }
}

function inRadiusNeibours(mesh, x, y, radius) {
  const width = mesh[0].length;
  const height = mesh.length;
  const neibours = [];
  if (edge === EDGE_CASE.absorb) {
    const startX = x - radius < 0 ? 0 : x - radius;
    const startY = y - radius < 0 ? 0 : y - radius;

    const stopX = x + radius + 1 > height ? height : x + radius + 1;
    const stopY = y + radius + 1 > width ? width : y + radius + 1;

    for (let i = startX; i < stopX; i++) {
      for (let j = startY; j < stopY; j++) {
        const cell = mesh[i][j];
        if (cell !== 0 && isPointInRadius(i, j, x, y, radius)) {
          neibours.push(cell);
        }
      }
    }
  } else {
    const startX = (x - radius + height) % height;
    const startY = (y - radius + width) % width;

    const stopX = (x + radius + 1) % height;
    const stopY = (y + radius + 1) % width;

    for (let i = startX; i !== stopX; i = (i + 1) % height) {
      for (let j = startY; j !== stopY; j = (j + 1) % width) {
        const cell = mesh[i][j];
        if (cell !== 0 && isPointInRadius(i, j, x, y, radius)) {
          neibours.push(cell);
        }
      }
    }
  }

  return neibours;
}

function isPointInRadius(x, y, centerX, centerY, radius) {
  const isInRadius =
    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2);

  return isInRadius;
}

function getDominantCell(cells) {
  const cellsCount = {};
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    for (let j = 0; j < cells.length; j++) {
      if (cell !== 0 && cells[j] === cell) {
        cellsCount[cell.id] = cellsCount[cell.id] ? cellsCount[cell.id] + 1 : 1;
      }
    }
  }

  const dominantCellId = Object.entries(cellsCount).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  const dominantCell = cells.find(
    c => c !== 0 && c.id === parseInt(dominantCellId, 10)
  );

  return dominantCell;
}
