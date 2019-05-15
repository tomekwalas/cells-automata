import { randomNumber } from "../../utils";

export const createCell = (id, color) => {
  const r = randomNumber(0, 255);
  const g = randomNumber(0, 255);
  const b = randomNumber(0, 255);

  return {
    id,
    color: color || `rgb(${r}, ${g}, ${b})`
  };
};
