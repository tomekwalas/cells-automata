import { EDGE_CASE, GROWTH } from "../grainGrowth";

export default function base(mesh, edge, type) {
  const nextMesh = [...mesh.map(cells => [...cells])];

  const height = mesh.length;
  const width = mesh[0].length;

  for (let i = 0; i < height; i++) {
    const row = mesh[i];
    for (let j = 0; j < width; j++) {
      const { neibours, mainCell } = getMainCellAndNeibours({
        i,
        j,
        mesh,
        row,
        edge,
        type
      });

      if (!neibours.some(n => n !== 0)) {
        continue;
      }

      if (mainCell.value !== 0) {
        continue;
      }

      const domimantCell = getDominantCell(neibours);

      const { x, y } = mainCell;

      nextMesh[x][y] = domimantCell;
    }
  }
  return nextMesh;
}

function getMainCellAndNeibours({ i, j, mesh, row, edge, type }) {
  const height = mesh.length;
  const width = mesh[0].length;
  let prevRow, currentRow, nextRow, prevCell, currentCell, nextCell;
  if (edge === EDGE_CASE.periodic) {
    prevRow = (i - 1 + mesh.length) % mesh.length;
    currentRow = i % mesh.length;
    nextRow = (i + 1) % mesh.length;

    prevCell = (j - 1 + row.length) % row.length;
    currentCell = j % row.length;
    nextCell = (j + 1) % row.length;
  } else {
    prevRow = i - 1 < 0 ? 0 : i - 1;
    currentRow = i;
    nextRow = i + 1 >= height ? height - 1 : i + 1;

    prevCell = j - 1 < 0 ? 0 : j - 1;
    currentCell = j;
    nextCell = j + 1 >= width ? width - 1 : j + 1;
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
  }
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
