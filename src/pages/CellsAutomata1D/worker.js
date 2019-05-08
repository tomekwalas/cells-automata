import { generateMesh } from "./cellsAutomata";

onmessage = ({ data }) => {
  const { width, height, rule } = data;
  const mesh = generateMesh(width, height, rule);

  postMessage(mesh);
};
