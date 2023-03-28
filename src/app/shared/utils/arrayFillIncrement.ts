export const arrayFillIncrement = (size: number) =>
  [...Array(size).keys()].map((item) => item + 1);
