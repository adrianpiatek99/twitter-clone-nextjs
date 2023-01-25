import type { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | "white" | string;
export type IconButtonSize = "small" | "medium" | "large";

const small = css`
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

const medium = css`
  & > svg {
    width: 20px;
    height: 20px;
  }
`;

const large = css`
  min-width: 42px;
  min-height: 42px;
  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const getIconButtonColor = (color: [string, string]) => {
  return css`
    color: ${color[0]};

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background-color: ${hexToRGBA(color[1], 0.1)};
        color: ${color[1]};
      }
    }

    &:active:not(:disabled) {
      background-color: ${hexToRGBA(color[1], 0.2)};
    }

    &:focus-visible {
      background-color: ${hexToRGBA(color[1], 0.1)};
      color: ${color[1]};
      box-shadow: ${hexToRGBA(color[1], 0.85)} 0px 0px 0px 2px;
    }
  `;
};

export const iconButtonSizeVariants: Record<IconButtonSize, StyledCssReturn> = {
  small,
  medium,
  large
} as const;
