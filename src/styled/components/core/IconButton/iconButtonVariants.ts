import { StyledCssReturn } from "styled/theme";
import { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export type IconButtonColor = "primary" | "secondary" | "error" | string;
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
  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const getIconButtonColor = (color: string) => {
  return css`
    @media ${({ theme }) => theme.breakpoints.sm} {
      &:hover:not(:disabled) {
        background-color: ${hexToRGBA(color, 0.1)};
      }
    }

    color: ${hexToRGBA(color, 0.5)};

    & > svg {
      color: ${color};
    }

    &:disabled {
      opacity: 0.5;
    }

    &:active:not(:disabled) {
      background-color: ${hexToRGBA(color, 0.2)};
    }

    &:focus-visible {
      background-color: ${hexToRGBA(color, 0.08)};
      box-shadow: ${color} 0px 0px 0px 2px;
    }
  `;
};

export const iconButtonSizeVariants: Record<IconButtonSize, StyledCssReturn> = {
  small,
  medium,
  large
} as const;
