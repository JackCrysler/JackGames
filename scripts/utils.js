export function randomColor() {
  return "#" + Math.random().toString(16).slice(2, 8);
}
export function randomNum(min, max) {
  const ret = Math.floor(Math.random() * (max - min + 1)) + min;
  if (ret === 0) {
    return randomNum(min, max)
  }
  return ret
}
