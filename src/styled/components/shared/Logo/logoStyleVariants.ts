import { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";

export type LogoSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";

const xs = css`
  height: 16px;
  width: 16px;
`;

const s = css`
  height: 24px;
  width: 24px;
`;

const m = css`
  height: 48px;
  width: 48px;
`;

const l = css`
  height: 64px;
  width: 64px;
`;

const xl = css`
  height: 96px;
  width: 96px;
`;

const xxl = css`
  height: 124px;
  width: 124px;
`;

export const logoSizeVariants: Record<LogoSize, StyledCssReturn> = {
  xs,
  s,
  m,
  l,
  xl,
  xxl
} as const;
