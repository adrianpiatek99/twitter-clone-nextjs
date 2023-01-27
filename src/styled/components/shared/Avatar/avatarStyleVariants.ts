import type { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";

export type AvatarSize = "small" | "medium" | "large" | "extraLarge";

const small = css`
  width: 32px;
  height: 32px;
`;

const medium = css`
  width: 40px;
  height: 40px;
`;

const large = css`
  width: 48px;
  height: 48px;
`;

const extraLarge = css`
  width: 68px;
  height: 68px;
`;

export const avatarSizeVariants: Record<AvatarSize, StyledCssReturn> = {
  small,
  medium,
  large,
  extraLarge
} as const;
