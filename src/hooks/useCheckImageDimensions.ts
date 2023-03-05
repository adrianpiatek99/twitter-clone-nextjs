import { useEffect, useState } from "react";

export const useCheckImageDimensions = (file: File | undefined) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (file) {
      const image = new Image();

      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        setDimensions({ width, height });

        return true;
      };
    }
  }, [file]);

  return dimensions;
};
