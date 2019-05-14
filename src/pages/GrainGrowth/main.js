mesh = null;

function paint() {
  const container = document.getElementById('game');
  container.innerHTML = null;
  const meshElements = mesh.map((cells, y) =>
    cells.map((cell, x) => {
      const cellElement = document.createElement('div');
      cellElement.setAttribute('x', x);
      cellElement.setAttribute('y', y);

      cellElement.className = !!cell ? 'cell selected' : 'cell';

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

window.onload = generateBoard;
