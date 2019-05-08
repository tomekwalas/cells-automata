export function determineCellState(cells) {
  let neibours = 0;

  const isMainCellAlive = cells[1][1] === 1;

  for (let i = 0; i < cells.length; i++) {
    const row = cells[i];
    for (let j = 0; j < row.length; j++) {
      if (i === 1 && j === 1) {
        continue;
      }

      const isAlive = row[j] === 1;

      if (isAlive) {
        neibours++;
      }
    }
  }

  if (isMainCellAlive && (neibours === 2 || neibours === 3)) {
    return 1;
  } else if (!isMainCellAlive && neibours === 3) {
    return 1;
  } else {
    return 0;
  }
}

export function getCell(outerIndex, innerIndex, mesh, row) {
  const prevRow = (outerIndex - 1 + mesh.length) % mesh.length;
  const currentRow = outerIndex % mesh.length;
  const nextRow = (outerIndex + 1) % mesh.length;

  const prevCell = (innerIndex - 1 + row.length) % row.length;
  const currentCell = innerIndex % row.length;
  const nextCell = (innerIndex + 1) % row.length;

  const a1 = mesh[prevRow][prevCell];
  const a2 = mesh[prevRow][currentCell];
  const a3 = mesh[prevRow][nextCell];

  const b1 = mesh[currentRow][prevCell];
  const b2 = mesh[currentRow][currentCell];
  const b3 = mesh[currentRow][nextCell];

  const c1 = mesh[nextRow][prevCell];
  const c2 = mesh[nextRow][currentCell];
  const c3 = mesh[nextRow][nextCell];

  const cell = [[a1, a2, a3], [b1, b2, b3], [c1, c2, c3]];

  return cell;
}

export function iterate(mesh) {
  let nextCells = [...mesh.map(cells => [...cells])];
  for (let i = 0; i < mesh.length; i++) {
    const row = mesh[i];

    for (let j = 0; j < row.length; j++) {
      const cell = getCell(i, j, mesh, row);

      const isAlive = determineCellState(cell);

      nextCells[i % mesh.length][j % row.length] = isAlive;
    }
  }

  return nextCells;
}
