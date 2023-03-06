import type { ImageProps as NextImageProps } from "next/image";
import NextImage from "next/image";
import { getSvgShimmerImage } from "utils/svg";

const shimmerImage = getSvgShimmerImage();

type ShimmerImageProps = Omit<NextImageProps, "src"> & {
  src: string;
};

export const ShimmerImage = (props: ShimmerImageProps) => {
  return <NextImage {...props} fill placeholder="blur" blurDataURL={shimmerImage} />;
};
