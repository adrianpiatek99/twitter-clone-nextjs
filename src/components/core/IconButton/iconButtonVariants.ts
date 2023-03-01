import type { StyledCssReturn } from "src/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | "white" | string;
export type IconButtonSize = "small" | "medium" | "large";

export type IconButtonElementProps = {
  size: IconButtonSize;
  $color: [string, string];
};

export const generalIconButtonStyles = css<IconButtonElementProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s;

  ${({ $color }) => getIconButtonColor($color)};
  ${({ size }) => iconButtonSizeVariants[size || "medium"]};
`;

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
