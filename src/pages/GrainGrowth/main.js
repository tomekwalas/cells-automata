import { nucleate, TYPES } from './grainGrowth';
import { createCell } from './Cell';
let mesh = null;
function onCellClick(cell) {
  return function() {
    const x = cell.getAttribute('x');
    const y = cell.getAttribute('y');
    mesh[y][x] = mesh[y][x] !== 0 ? 0 : createCell(x * y);

    paint();
  };
}
function paint() {
  const container = document.getElementById('game');
  container.innerHTML = null;
  const meshElements = mesh.map((cells, y) =>
    cells.map((cell, x) => {
      const cellElement = document.createElement('div');
      cellElement.setAttribute('x', x);
      cellElement.setAttribute('y', y);
      cellElement.onclick = onCellClick(cellElement);

      cellElement.className = !!cell ? 'cell selected' : 'cell';
      cellElement.style.backgroundColor = cell ? cell.color : undefined;

      return cellElement;
    })
  );
  const flatted = meshElements.flat();

  for (const element of flatted) {
    container.appendChild(element);
  }
}

function generateBoard() {
  const container = document.getElementById('game');

  const width = parseInt(document.getElementById('width').value, 10);
  const height = parseInt(document.getElementById('height').value, 10);

  container.style['display'] = 'grid';
  container.style['gridTemplateColumns'] = `repeat(${width}, 20px)`;

  mesh = [...Array(height).keys()].map(() =>
    [...Array(width).keys()].map(() => 0)
  );

  paint();
}
let selected = TYPES.homogeneus;

window.onload = generateBoard;
document.getElementById('width').onchange = generateBoard;
document.getElementById('height').onchange = generateBoard;
document.getElementById('start').onclick = function() {
  mesh = [...mesh.map(cells => cells.map(() => 0))];
  const grains = document.getElementById('grains').value;
  const grainPerHeight = parseInt(
    document.getElementById('grainsHeight').value,
    10
  );
  const grainPerWidth = parseInt(
    document.getElementById('grainsWidth').value,
    10
  );
  const data = {
    grainCount: parseInt(grains, 10),
    radius: 2,
    grainPerHeight,
    grainPerWidth
  };
  mesh = nucleate(mesh, selected, data);

  paint();
};

Object.keys(TYPES).forEach(type => {
  const container = document.getElementById('type');
  const nucleateOption = document.createElement('option');
  nucleateOption.setAttribute('value', type);
  nucleateOption.innerText = type;
  container.appendChild(nucleateOption);
});

document.getElementById('type').value = selected;
document.getElementById('type').onchange = e => {
  selected = e.target.value;
};
