import { iterate } from "./game";
import { getPresets, getPreset } from "./presets";

function onCellClick(cell) {
  return function() {
    const x = cell.getAttribute("x");
    const y = cell.getAttribute("y");
    mesh[y][x] = mesh[y][x] === 1 ? 0 : 1;

    paint();
  };
}

function paint() {
  const container = document.getElementById("game");
  container.innerHTML = null;
  const meshElements = mesh.map((cells, y) =>
    cells.map((cell, x) => {
      const cellElement = document.createElement("div");
      cellElement.setAttribute("x", x);
      cellElement.setAttribute("y", y);
      cellElement.onclick = onCellClick(cellElement);

      cellElement.className = !!cell ? "cell selected" : "cell";

      return cellElement;
    })
  );
  const flatted = meshElements.flat();

  for (const element of flatted) {
    container.appendChild(element);
  }
}

function generateBoard() {
  const container = document.getElementById("game");

  const width = parseInt(document.getElementById("width").value, 10);
  const height = parseInt(document.getElementById("height").value, 10);

  container.style["display"] = "grid";
  container.style["gridTemplateColumns"] = `repeat(${width}, 20px)`;

  mesh = [...Array(height).keys()].map(() =>
    [...Array(width).keys()].map(() => 0)
  );

  paint();
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
function startGame() {
  played = true;
  document.getElementById("start").innerText = "Pause";
  document.getElementById("start").onclick = stopGame;

  play();
}

function play() {
  if (!played) {
    return;
  }
  next();
  console.log(speed);
  sleep(speed).then(play);
}

function next() {
  mesh = iterate(mesh);

  paint();
}

function stopGame() {
  played = false;
  document.getElementById("start").innerText = "Start";
  document.getElementById("start").onclick = startGame;
}

function randomElements() {
  const width = parseInt(document.getElementById("width").value, 10);
  const height = parseInt(document.getElementById("height").value, 10);
  mesh = [...Array(height).keys()].map(() =>
    [...Array(width).keys()].map(() => {
      const min = 0;
      const max = 4;
      const random = Math.floor(Math.random() * (max - min) + min);
      return random === 2 ? 1 : 0;
    })
  );

  paint();
}

function loadPreset() {
  const preset = getPreset(selectedPreset);

  const presetWidth = preset[0].length;
  const presetHeight = preset.length;
  const meshWidth = mesh[0].length;
  const meshHeight = mesh.length;
  if (presetWidth > meshWidth) {
    const boardWidth = document.getElementById("width");
    boardWidth.value = presetWidth;
    boardWidth.onchange();
  }

  if (presetHeight > meshHeight) {
    const boardHeight = document.getElementById("height");
    boardHeight.value = presetHeight;
    boardHeight.onchange();
  }

  for (let i = 0; i < presetHeight; i++) {
    for (let j = 0; j < presetWidth; j++) {
      mesh[i][j] = preset[i][j];
    }
  }

  paint();
}

let mesh = null;
let speed = 200;
let played = false;
let selectedPreset = null;

window.onload = generateBoard;

getPresets().forEach(preset => {
  const container = document.getElementById("presets");
  const presetOption = document.createElement("option");
  presetOption.setAttribute("value", preset.value);
  presetOption.innerText = preset.name;

  container.appendChild(presetOption);
});

document.getElementById("presets").onchange = function(e) {
  selectedPreset = e.target.value;
};

document.getElementById("start").onclick = startGame;
document.getElementById("random").onclick = randomElements;
document.getElementById("next").onclick = next;
document.getElementById("load").onclick = loadPreset;

document.getElementById("width").onchange = generateBoard;
document.getElementById("height").onchange = generateBoard;
document.getElementById("speed").value = speed;
document.getElementById("speed").onchange = function(e) {
  console.log(e.target.value);
  speed = parseInt(e.target.value, 10);
};
