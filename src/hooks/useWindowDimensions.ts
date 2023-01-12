import { useEffect, useState } from "react";

import { useTheme } from "styled-components";

export type Dimensions = {
  width: number;
  height: number;
};

export const useWindowDimensions = () => {
  const {
    breakpointSizes: { sm }
  } = useTheme();
  const [windowDimensions, setWindowDimensions] = useState<Dimensions | null>(null);
  const mobileWidth = Number(sm);

  const getWindowDimensions = (): Dimensions | null => {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    if (!windowDimensions) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = (): boolean => {
    if (windowDimensions && windowDimensions.width < mobileWidth) {
      return true;
    }

    return false;
  };

  return { windowDimensions, isMobileView };
};
