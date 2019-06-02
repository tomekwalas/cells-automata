import { createCell } from "../Cell";

export default function homogeneus(mesh, data) {
  const { grainPerWidth, grainPerHeight, color } = data;

  const width = mesh[0].length;
  const height = mesh.length;

  const heightLeap = Math.ceil(height / grainPerHeight);
  const widthtLeap = Math.ceil(width / grainPerWidth);

  const nextMesh = [...mesh.map(cells => [...cells])];
  let id = 1;
  for (let i = 0; i < height; i = i + heightLeap) {
    for (let j = 0; j < width; j = j + widthtLeap) {
      const cell = createCell({ id: id++, color, x: i, y: j });
      nextMesh[i][j] = cell;
    }
  }

  return nextMesh;
}
