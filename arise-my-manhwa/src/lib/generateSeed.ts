// 32-bit integer multiplied by randomly genereated floating point number between 0 and 1
// and rounded to lowest nearest integer
export function generateSeed() {
  return Math.floor(Math.random() * Math.pow(2, 31));
}
