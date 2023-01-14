import { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary" | "danger";
export type ButtonColors = { color: string; backgroundColor: string };

export const getSpecificButtonVariant = ({
  color,
  backgroundColor,
  variant
}: ButtonColors & { variant: ButtonVariant }) => {
  if (variant === "outlined") return getButtonOutlinedStyles({ color, backgroundColor });

  if (variant === "text") return getButtonTextStyles({ color, backgroundColor });

  return getButtonContainedStyles({ color, backgroundColor });
};

const getButtonContainedStyles = ({ color, backgroundColor }: ButtonColors) =>
  css`
    background-color: ${backgroundColor};
    color: ${color};

    &:hover:not(:disabled) {
      background-color: ${hexToRGBA(backgroundColor, 0.75)};
    }

    &:disabled {
      background-color: ${hexToRGBA(backgroundColor, 0.5)};
      color: ${hexToRGBA(color, 0.5)};
    }
  `;

const getButtonOutlinedStyles = ({ color, backgroundColor }: ButtonColors) =>
  css`
    background-color: transparent;
    color: ${color};
    border-color: ${hexToRGBA(backgroundColor, 0.65)};

    &:hover:not(:disabled) {
      border-color: ${hexToRGBA(backgroundColor, 0.65)};
      background-color: ${hexToRGBA(color, 0.1)};
    }

    &:disabled {
      color: ${hexToRGBA(color, 0.5)};
      border-color: ${hexToRGBA(backgroundColor, 0.4)};
    }
  `;

const getButtonTextStyles = ({ color, backgroundColor }: ButtonColors) =>
  css`
    background-color: transparent;
    border-radius: 0px;
    color: ${color};

    &:hover:not(:disabled) {
      background-color: ${hexToRGBA(backgroundColor, 0.1)};
    }

    &:disabled {
      color: ${hexToRGBA(color, 0.5)};
    }
  `;

const small = css`
  min-height: 32px;
  ${({ theme }) => theme.text.s};
`;

const medium = css`
  height: 36px;
`;

const large = css`
  height: 42px;
`;

export const sizeVariants: Record<ButtonSize, StyledCssReturn> = {
  small,
  medium,
  large
} as const;
