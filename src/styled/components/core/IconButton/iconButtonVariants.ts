import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | string;

export const setIconButtonColor = (color: string) => {
  return css`
    color: ${hexToRGBA(color, 0.5)};

    & > svg {
      fill: ${color};
    }

    &:hover:not(:disabled) {
      background-color: ${hexToRGBA(color, 0.1)};
    }
  `;
};
