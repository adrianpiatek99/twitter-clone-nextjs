import { toBase64 } from "./strings";

const grayLightColor = "#333";
const grayShadowColor = "#222";

const getSvgShimmer = (width: string | number = "100%", height: string | number = "100%") => `
<svg
  version="1.1" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}"
  height="${height}"
>
  <defs>
    <linearGradient id="g">
      <stop stop-color="${grayLightColor}" offset="20%" />
      <stop stop-color="${grayShadowColor}" offset="50%" />
      <stop stop-color="${grayLightColor}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${grayLightColor}" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
</svg>`;

/** Returns a `base64` shimmer image in SVG. */
export const getSvgShimmerImage = () => `data:image/svg+xml;base64,${toBase64(getSvgShimmer())}`;
