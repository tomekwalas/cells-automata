import { randomNumber } from '../../utils';

export const createCell = ({ id, color, x, y }) => {
  const r = randomNumber(0, 255);
  const g = randomNumber(0, 255);
  const b = randomNumber(0, 255);

  return {
    id,
    color: color || `rgb(${r}, ${g}, ${b})`,
    x,
    y,
    energy: 0,
    recrystalized: false,
    dislocationDensity: 0
  };
};
