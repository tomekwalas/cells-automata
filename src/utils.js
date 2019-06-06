export function randomNumber(min, max, round = true) {
  if (round) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.random() * (max - min) + min;
  }
}
export function clone(arr) {
  return [...arr.map(subarr => [...subarr])];
}
