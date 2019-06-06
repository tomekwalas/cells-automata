import { createCell } from "./Cell";
import { getEnergyMesh } from "./Energy";
import { EDGE_CASE, grow, GROWTH, nucleate, TYPES } from "./grainGrowth";
import { dislocationGun } from "./Recrystalization";
let mesh = null;
function onCellClick(cell) {
  return function() {
    const x = cell.getAttribute("x");
    const y = cell.getAttribute("y");
    mesh[y][x] = mesh[y][x] !== 0 ? 0 : createCell({ id: x * y, x, y });

    paint();
  };
}

function getMaxEnergy() {
  let maxEnergy = 0;

  mesh.forEach(cells =>
    cells.forEach(cell => {
      if (cell.energy > maxEnergy) {
        maxEnergy = cell.energy;
      }
    })
  );

  return parseFloat(maxEnergy);
}

function getMaxDensity() {
  let maxDensity = 0;

  mesh.forEach(cells =>
    cells.forEach(cell => {
      if (cell.dislocationDensity > maxDensity) {
        maxDensity = cell.dislocationDensity;
      }
    })
  );

  return parseFloat(maxDensity);
}

function round(number) {
  return Math.round(number * 100) / 100;
}

function paint() {
  const container = document.getElementById("game");
  container.innerHTML = null;

  const maxEnergy = getMaxEnergy();
  const maxDensity = getMaxDensity();
  const meshElements = mesh.map((cells, y) =>
    cells.map((cell, x) => {
      const cellElement = document.createElement("div");
      cellElement.setAttribute("x", x);
      cellElement.setAttribute("y", y);
      cellElement.onclick = onCellClick(cellElement);

      cellElement.className = "cell";
      if (showEnergy) {
        const energy = round(parseFloat(cell.energy) / maxEnergy);
        cellElement.style.backgroundColor = cell
          ? `rgba(255,0,0, ${energy})`
          : undefined;
      } else if (showDensity) {
        const density = round(parseFloat(cell.dislocationDensity) / maxDensity);
        cellElement.style.backgroundColor = cell
          ? `rgba(0,0,255, ${density})`
          : undefined;
      } else {
        cellElement.style.backgroundColor = cell ? cell.color : undefined;
      }

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
  container.style["gridTemplateColumns"] = `repeat(${width}, 10px)`;

  mesh = [...Array(height).keys()].map(() =>
    [...Array(width).keys()].map(() => 0)
  );

  paint();
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function stop() {
  played = false;
  document.getElementById("start").innerText = "Grow";
  document.getElementById("start").onclick = start;
}
function start() {
  played = true;
  document.getElementById("start").innerText = "Stop";
  document.getElementById("start").onclick = stop;

  play();
}

function play() {
  if (!played) {
    return;
  }
  next();
  sleep(200).then(play);
}

function next() {
  const radius = parseInt(document.getElementById("radius").value, 10);
  mesh = grow(mesh, selectedGrowthType, selectedBorderType, { radius });

  paint();
}

function nextEnergy() {
  const radius = parseInt(document.getElementById("radius").value, 10);
  mesh = getEnergyMesh(mesh, selectedGrowthType, { radius });
  paint();
}
let iterations = 0;
function playEnergy() {
  const maxIterations = parseInt(
    document.getElementById("energyIterations").value,
    10
  );
  if (iterations > maxIterations) {
    return;
  }
  nextEnergy();
  iterations++;
  sleep(200).then(playEnergy);
}

function mc() {
  if (showEnergy) {
    document.getElementById("mc").innerText = "Show Energy";
  } else {
    document.getElementById("mc").innerText = "Show Grains";
  }
  showEnergy = !showEnergy;
  paint();
}
let timestamp = 0;
const TIMESTAMP = 0.01;

function getDislocation() {
  const TIME = 2;
  mesh = dislocationGun({ mesh, timestamp });
  timestamp += TIMESTAMP;
  paint();
}

let selectedNucleationType = TYPES.withRadius;
let selectedGrowthType = GROWTH.von_neumann;
let selectedBorderType = EDGE_CASE.absorb;
let played = true;
let showEnergy = false;
let showDensity = false;

window.onload = generateBoard;
document.getElementById("width").onchange = generateBoard;
document.getElementById("height").onchange = generateBoard;
document.getElementById("next").onclick = next;
document.getElementById("mc").onclick = mc;
document.getElementById("dislocation").onclick = getDislocation;
document.getElementById("showDislocation").onclick = function() {
  showDensity = !showDensity;
  paint();
};

document.getElementById("mcPlay").onclick = function() {
  iterations = 0;
  playEnergy();
};

document.getElementById("nucleate").onclick = function() {
  mesh = [...mesh.map(cells => cells.map(() => 0))];
  const radius = parseInt(document.getElementById("radius").value, 10);
  const grainCount = parseInt(document.getElementById("grains").value, 10);
  const grainPerHeight = parseInt(
    document.getElementById("grainsHeight").value,
    10
  );
  const grainPerWidth = parseInt(
    document.getElementById("grainsWidth").value,
    10
  );
  const data = {
    grainCount,
    radius,
    grainPerHeight,
    grainPerWidth,
    edge: selectedBorderType
  };
  mesh = nucleate(mesh, selectedNucleationType, data);

  paint();
};
document.getElementById("start").onclick = start;

Object.values(TYPES).forEach(type => {
  const container = document.getElementById("type");
  const nucleateOption = document.createElement("option");
  nucleateOption.setAttribute("value", type);
  nucleateOption.innerText = type;
  container.appendChild(nucleateOption);
});

document.getElementById("type").value = selectedNucleationType;
document.getElementById("type").onchange = e => {
  selectedNucleationType = e.target.value;
};

Object.values(GROWTH).forEach(growth => {
  const container = document.getElementById("growth");
  const growthOption = document.createElement("option");
  growthOption.setAttribute("value", growth);
  growthOption.innerText = growth;
  container.appendChild(growthOption);
});

document.getElementById("growth").value = selectedGrowthType;
document.getElementById("growth").onchange = e => {
  selectedGrowthType = e.target.value;
};

Object.values(EDGE_CASE).forEach(edge => {
  const container = document.getElementById("edge");
  const edgeOption = document.createElement("option");
  edgeOption.setAttribute("value", edge);
  edgeOption.innerText = edge;
  container.appendChild(edgeOption);
});

document.getElementById("edge").value = selectedBorderType;
document.getElementById("edge").onchange = e => {
  selectedBorderType = e.target.value;
};
