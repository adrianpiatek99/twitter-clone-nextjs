import type { StyledCssReturn } from "src/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | "white" | "dark";
export type IconButtonSize = "small" | "medium" | "large";

export type IconButtonElementProps = {
  size: IconButtonSize;
  color: IconButtonColor;
  customColor?: string;
};

type ColorVariant = {
  isSelected?: boolean;
};

export const generalIconButtonStyles = css<IconButtonElementProps & ColorVariant>`
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

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${({ customColor, color, theme, isSelected }) =>
    customColor
      ? css`
          ${getIconButtonColor(
            theme.neutral300,
            "transparent",
            customColor,
            customColor,
            isSelected
          )}
        `
      : css`
          ${iconButtonColorVariants[color || "primary"]};
        `}

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

const primary = css<ColorVariant>`
  ${({ theme: { primary05 }, isSelected }) =>
    getIconButtonColor(primary05, "transparent", primary05, primary05, isSelected)};
`;

const secondary = css<ColorVariant>`
  ${({ theme: { neutral300, primary05 }, isSelected }) =>
    getIconButtonColor(neutral300, "transparent", primary05, primary05, isSelected)};
`;

const error = css<ColorVariant>`
  ${({ theme: { error40 }, isSelected }) =>
    getIconButtonColor(error40, "transparent", error40, error40, isSelected)};
`;

const white = css<ColorVariant>`
  ${({ theme: { white }, isSelected }) =>
    getIconButtonColor(white, "transparent", white, white, isSelected)};
`;

const dark = css<ColorVariant>`
  ${({ theme: { white, dark150 } }) => css`
    color: ${white};
    background-color: ${hexToRGBA(dark150, 0.8)};

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background-color: ${hexToRGBA(dark150, 0.65)};
      }
    }

    &:active:not(:disabled) {
      background-color: ${hexToRGBA(dark150, 0.6)};
    }

    &:focus-visible {
      background-color: ${hexToRGBA(dark150, 0.7)};
      box-shadow: ${hexToRGBA(white, 0.8)} 0px 0px 0px 2px;
    }
  `}
`;

export const getIconButtonColor = (
  color: string,
  backgroundColor: string,
  hoverColor: string,
  hoverBackgroundColor: string,
  isSelected?: boolean
) => {
  return css`
    color: ${isSelected ? hoverColor : color};
    background-color: ${backgroundColor};

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background-color: ${hexToRGBA(hoverBackgroundColor, 0.1)};
        color: ${hoverColor};
      }
    }

    &:active:not(:disabled) {
      background-color: ${hexToRGBA(hoverBackgroundColor, 0.2)};
    }

    &:focus-visible {
      background-color: ${hexToRGBA(hoverBackgroundColor, 0.1)};
      color: ${hoverColor};
      box-shadow: ${hexToRGBA(hoverBackgroundColor, 0.85)} 0px 0px 0px 2px;
    }
  `;
};

export const iconButtonColorVariants: Record<IconButtonColor, StyledCssReturn> = {
  primary,
  secondary,
  error,
  white,
  dark
} as const;

export const iconButtonSizeVariants: Record<IconButtonSize, StyledCssReturn> = {
  small,
  medium,
  large
} as const;
