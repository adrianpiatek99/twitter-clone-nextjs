import { Dimensions } from "hooks/useWindowDimensions";

export const isMobile = (windowDimensions: Dimensions | null, breakpoint: string) => {
  if (!windowDimensions) {
    return false;
  }

  return windowDimensions?.width < parseInt(breakpoint.replace("px", ""));
};
