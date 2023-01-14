import { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary" | "danger";

type ButtonColorCss = Record<ButtonColor, StyledCssReturn>;

const contained: ButtonColorCss = {
  primary: css`
    background-color: ${({ theme }) => theme.primary05};
    color: ${({ theme }) => theme.neutral20};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.75)};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.neutral20};
    color: ${({ theme }) => theme.darker10};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.75)};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.error20};
    color: ${({ theme }) => theme.neutral20};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.75)};
    }
  `
};

const outlined: ButtonColorCss = {
  primary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.neutral20};
    border-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.65)};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.65)};
      background-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.1)};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.neutral20};
    border-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.65)};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.65)};
      background-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.1)};
    }
  `,
  danger: css`
    background-color: transparent;
    color: ${({ theme }) => theme.neutral20};
    border-color: ${({ theme }) => hexToRGBA(theme.error20, 0.65)};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => hexToRGBA(theme.error20, 0.65)};
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.1)};
    }
  `
};

const text: ButtonColorCss = {
  primary: css`
    background-color: transparent;
    border-radius: 0px;
    color: ${({ theme }) => theme.primary05};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.1)};
    }
  `,
  secondary: css`
    background-color: transparent;
    border-radius: 0px;
    color: ${({ theme }) => theme.neutral20};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.1)};
    }
  `,
  danger: css`
    background-color: transparent;
    border-radius: 0px;
    color: ${({ theme }) => theme.error20};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.1)};
    }
  `
};

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

export const buttonVariantsWithColor: Record<ButtonVariant, ButtonColorCss> = {
  contained,
  outlined,
  text
} as const;
