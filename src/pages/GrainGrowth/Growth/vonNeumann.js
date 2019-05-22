import { EDGE_CASE } from '../grainGrowth';

export default function vonNeumann(mesh, edge) {
  const nextMesh = [...mesh.map(cells => [...cells])];

  const height = mesh.length;
  const width = mesh[0].length;

  for (let i = 0; i < height; i++) {
    const row = mesh[i];
    for (let j = 0; j < width; j++) {
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
        nextRow = i + 1 > height ? height : i + 1;

        prevCell = j - 1 < 0 ? 0 : j - 1;
        currentCell = j;
        nextCell = j + 1 > width ? width : j + 1;
      }

      const a1 = mesh[prevRow][currentCell];

      const b1 = mesh[currentRow][prevCell];
      const b2 = mesh[currentRow][currentCell];
      const b3 = mesh[currentRow][nextCell];

      const c1 = mesh[nextRow][currentCell];

      const neibours = [a1, b1, b3, c1];

      if (!neibours.some(n => n !== 0)) {
        return nextMesh;
      }

      const domimantCell = getDominantCell(neibours);

      nextMesh[currentRow][currentCell] = domimantCell;
    }

    return nextMesh;
  }
}

function getDominantCell(cells) {
  const cellsCount = {};
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    for (let j = 0; cells.length; j++) {
      if (cell !== 0 && cells[j] === cell) {
        cellsCount[cell.id] = cellsCount[cell.id] ? cellsCount[cell.id] + 1 : 1;
      }
    }
  }

  return Object.values(cellsCount).sort()[0];
}
