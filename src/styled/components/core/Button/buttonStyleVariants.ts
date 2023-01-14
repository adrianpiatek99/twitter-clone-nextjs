import { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type ButtonVariant = "contained" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary";

const contained = css`
  background-color: ${({ theme }) => theme.primary05};
  color: ${({ theme }) => theme.neutral20};
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.75)}`};
  }

  &:disabled {
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.5)}`};
    color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.5)}`};
  }
`;

const outlined = css`
  background-color: transparent;
  color: ${({ theme }) => theme.neutral20};
  border-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.65)}`};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.65)}`};
    background-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.1)}`};
  }

  &:disabled {
    color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.5)}`};
    border-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.4)}`};
  }
`;

const text = css``;

export const styleVariants: Record<ButtonVariant, StyledCssReturn> = {
  contained,
  outlined,
  text
} as const;

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
