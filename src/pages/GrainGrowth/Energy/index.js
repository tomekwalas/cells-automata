import { randomNumber } from "../../../utils";
import { EDGE_CASE } from "../grainGrowth";
import { getMainCellAndNeibours } from "../Growth/base";

function clone(arr) {
  return [...arr.map(subarr => [...subarr])];
}

export function getEnergyMesh(mesh, type, data) {
  const newMesh = clone(mesh);
  const cl = clone(mesh);
  const shuffledMesh = shuffle(cl.map(c => shuffle(c)));
  const width = shuffledMesh[0].length;
  const height = shuffledMesh.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const cell = shuffledMesh[i][j];
      const { neibours } = getMainCellAndNeibours({
        x: parseInt(cell.x, 10),
        y: parseInt(cell.y, 10),
        mesh: newMesh,
        edge: EDGE_CASE.absorb,
        type,
        data
      });

      const foreignNeibours = neibours.filter(c => c.id !== cell.id);

      const energyBefore = foreignNeibours.length;

      if (energyBefore === 0) {
        newMesh[parseInt(cell.x, 10)][parseInt(cell.y, 10)] = {
          ...cell,
          x: parseInt(cell.x, 10),
          y: parseInt(cell.y, 10),
          energy: energyBefore
        };
        continue;
      }

      const randomIndex = randomNumber(0, foreignNeibours.length);

      const newCell = foreignNeibours[randomIndex];
      const newForeignNeibours = neibours.filter(c => c.id !== newCell.id);

      const energyAfter = newForeignNeibours.length;
      const delta = energyAfter - energyBefore;
      let probability;
      const kt = 1;
      if (delta > 0) {
        probability = Math.round(Math.exp(-delta / kt) * 100);
      } else {
        probability = 100;
      }

      const shouldChange =
        probability < 100 ? randomNumber(0, 100) < probability : true;

      if (shouldChange) {
        newMesh[parseInt(cell.x, 10)][parseInt(cell.y, 10)] = {
          ...cell,
          id: newCell.id,
          color: newCell.color,
          x: parseInt(cell.x, 10),
          y: parseInt(cell.y, 10),
          energy: energyAfter
        };
      } else {
        newMesh[parseInt(cell.x, 10)][parseInt(cell.y, 10)] = {
          ...cell,
          x: parseInt(cell.x, 10),
          y: parseInt(cell.y, 10),
          energy: energyBefore
        };
      }
    }
  }

  return newMesh;
}

function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
