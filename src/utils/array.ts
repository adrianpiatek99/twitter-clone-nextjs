export const createArray = (size: number) =>
  Array(size)
    .fill("")
    .map((_, i) => i + 1);
