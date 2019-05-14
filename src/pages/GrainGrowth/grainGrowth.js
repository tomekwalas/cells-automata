export const TYPES = {
  homogeneus: 'homogeneus',
  random: 'random'
};

export function nucleate(mesh, type, data) {
  switch (type) {
    case TYPES.homogeneus:
      return homogeneus(mesh, data);
    case TYPES.random:
      return random(mesh, data);
  }
}

function homogeneus(mesh, data) {
  const { grainPerWidth, grainPerHeight } = data;

  const width = mesh[0].length;
  const height = mesh.length;

  const heightLeap = Math.ceil(height / grainPerHeight);
  const widthtLeap = Math.ceil(width / grainPerWidth);

  const nextMesh = [...mesh.map(cells => [...cells])];
  for (let i = 0; i < height; i = i + heightLeap) {
    for (let j = 0; j < width; j = j + widthtLeap) {
      nextMesh[i][j] = 1;
    }
  }

  return nextMesh;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function random(mesh, data) {
  const { grainCount } = data;

  const width = mesh[0].length;
  const height = mesh.length;
  const nextMesh = [...mesh.map(cells => [...cells])];

  for (let i = 0; i < grainCount; i++) {
    const randomHeight = randomNumber(0, height);
    const randomWidth = randomNumber(0, width);

    if (nextMesh[randomHeight][randomWidth] === 0) {
      nextMesh[randomHeight][randomWidth] = 1;
    }
  }

  return nextMesh;
}
