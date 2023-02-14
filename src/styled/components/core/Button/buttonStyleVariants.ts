import type { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large" | "extraLarge";
export type ButtonColor = "primary" | "secondary" | "danger";

type ButtonColorCss = Record<ButtonColor, StyledCssReturn>;

export type ButtonElementProps = {
  variant: ButtonVariant;
  size: ButtonSize;
  $color: ButtonColor;
  $fullWidth: boolean;
  $textAlign: string;
};

export const generalButtonStyles = css<ButtonElementProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $textAlign }) => ($textAlign === "center" ? "center" : "start")};
  min-width: 36px;
  padding: 0 16px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: 50px;
  overflow-wrap: break-word;
  text-transform: none;
  font-weight: 500;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s;

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }

  ${({ theme }) => theme.text.m};
  ${({ size }) => sizeVariants[size || "normal"]};
  ${({ $color, variant }) => buttonVariantsWithColor[variant || "contained"][$color]};
`;

const contained: ButtonColorCss = {
  primary: css`
    background-color: ${({ theme }) => theme.primary05};
    color: ${({ theme }) => theme.neutral50};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.85)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.75)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => theme.boxShadows.primary};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.neutral50};
    color: ${({ theme }) => theme.dark150};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.85)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.75)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.neutral50} 0px 0px 0px 2px`};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.error20};
    color: ${({ theme }) => theme.neutral50};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.85)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.75)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.error20} 0px 0px 0px 2px`};
    }
  `
};

const outlined: ButtonColorCss = {
  primary: css`
    border: 1px solid ${({ theme }) => hexToRGBA(theme.primary05, 0.65)};
    color: ${({ theme }) => theme.neutral50};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => theme.boxShadows.primary};
    }
  `,
  secondary: css`
    border: 1px solid ${({ theme }) => hexToRGBA(theme.neutral50, 0.65)};
    color: ${({ theme }) => theme.neutral50};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.neutral50} 0px 0px 0px 2px`};
    }
  `,
  danger: css`
    border: 1px solid ${({ theme }) => hexToRGBA(theme.error20, 0.65)};
    color: ${({ theme }) => theme.error20};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.error20} 0px 0px 0px 2px`};
    }
  `
};

const text: ButtonColorCss = {
  primary: css`
    border-radius: 0px;
    color: ${({ theme }) => theme.primary05};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `inset ${theme.boxShadows.primary}`};
    }
  `,
  secondary: css`
    border-radius: 0px;
    color: ${({ theme }) => theme.neutral50};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.neutral50} 0px 0px 0px 2px inset`};
    }
  `,
  danger: css`
    border-radius: 0px;
    color: ${({ theme }) => theme.error20};

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.1)};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.error20, 0.15)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => `${theme.error20} 0px 0px 0px 2px inset`};
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

const extraLarge = css`
  height: 54px;
  ${({ theme }) => theme.text.xl};
`;

export const sizeVariants: Record<ButtonSize, StyledCssReturn> = {
  small,
  medium,
  large,
  extraLarge
} as const;

export const buttonVariantsWithColor: Record<ButtonVariant, ButtonColorCss> = {
  contained,
  outlined,
  text
} as const;
