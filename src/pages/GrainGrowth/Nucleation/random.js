import { createCell } from '../Cell';
import { randomNumber } from '../../../utils';

export default function random(mesh, data) {
  const { grainCount } = data;

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
