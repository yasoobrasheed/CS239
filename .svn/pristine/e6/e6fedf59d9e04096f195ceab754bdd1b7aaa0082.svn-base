// convert an rgb represent, eg {r: 0, g: 255, b: 255} to the equivalant hex;
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function rgbToHex(color) {
  const {r, g, b} = color;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
