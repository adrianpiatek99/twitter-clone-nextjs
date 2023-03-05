export const calcPaddingAspectRatio = (width: number, height: number) => {
  const paddingAspectRatio = Number(((Math.round(height) / Math.round(width)) * 100).toFixed(2));

  if (!isNaN(paddingAspectRatio)) return paddingAspectRatio;

  return 0;
};
