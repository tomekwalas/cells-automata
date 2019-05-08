const worker = new Worker("worker.js");

worker.onmessage = e => {
  const container = document.getElementById("grid");
  const mesh = e.data;
  const meshElements = mesh.map(cells =>
    cells.map(cell => {
      const cellElement = document.createElement("div");
      cellElement.className = !!cell ? "cell selected" : "cell";

      return cellElement;
    })
  );
  const flatted = meshElements.flat();
  document.getElementById("loader").style.visibility = "hidden";

  for (const element of flatted) {
    container.appendChild(element);
  }
};

function generateElements() {
  const container = document.getElementById("grid");
  container.innerHTML = null;
  const width = parseInt(document.getElementById("width").value, 10);
  const height = parseInt(document.getElementById("height").value, 10);
  const rule = parseInt(document.getElementById("rule").value, 10);
  container.style["display"] = "grid";

  container.style["gridTemplateColumns"] = `repeat(${width}, 10px)`;

  const data = {
    width,
    height,
    rule
  };

  document.getElementById("loader").style.visibility = "visible";

  worker.postMessage(data);
}

document.getElementById("generate").onclick = generateElements;
