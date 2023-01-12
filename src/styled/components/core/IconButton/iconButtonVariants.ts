import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | string;

export const getIconButtonColor = (color: string) => {
  return css`
    color: ${hexToRGBA(color, 0.5)};

    & > div > svg {
      color: ${color};
    }

    &:hover:not(:disabled) {
      background-color: ${hexToRGBA(color, 0.1)};
    }

    &:focus-visible {
      box-shadow: ${color} 0px 0px 0px 2px;
    }
  `;
};
