import React, { ComponentPropsWithoutRef, FC, forwardRef, ReactNode, Ref, useMemo } from "react";

import { Tooltip } from "@mui/material";
import styled, { css, useTheme } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { Text } from "../Text";
import { IconButtonColor, iconButtonSizeVariants } from "./iconButtonVariants";

interface IconLinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  label: string;
  title?: string;
  color?: IconButtonColor;
  isSelected?: boolean;
  isError?: boolean;
  disableFocus?: boolean;
}

export const IconButtonWithLabel: FC<IconLinkButtonProps> = forwardRef(
  (
    {
      children,
      label,
      title = "",
      color = "primary",
      isError = false,
      isSelected = false,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, white, neutral300, error40 } = useTheme();

    const iconButtonColors = useMemo((): [string, string] => {
      if (isError) return [error40, error40];

      if (color === "primary") return [primary05, primary05];

      if (color === "secondary") return [neutral300, primary05];

      if (color === "white") return [white, white];

      return [neutral300, color];
    }, [isError, color]);

    return (
      <Tooltip title={title} disableInteractive enterNextDelay={100}>
        <ButtonWrapper $color={iconButtonColors} isSelected={isSelected} {...props} ref={ref}>
          <IconWrapper>{children}</IconWrapper>
          <LabelWrapper>
            <Text>{label}</Text>
          </LabelWrapper>
        </ButtonWrapper>
      </Tooltip>
    );
  }
);

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  margin-right: -8px;

  ${iconButtonSizeVariants["medium"]};
`;

const LabelWrapper = styled.div`
  padding: 0 12px;

  & > span {
    color: inherit;
  }
`;

const ButtonWrapper = styled.button<{
  $color: [string, string];
  isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${({ $color }) => css`
    color: ${$color[0]};

    &:hover:not(:disabled),
    &:focus-visible {
      color: ${$color[1]};

      ${IconWrapper} {
        background-color: ${hexToRGBA($color[1], 0.1)};
      }
    }

    &:active:not(:disabled) {
      ${IconWrapper} {
        background-color: ${hexToRGBA($color[1], 0.2)};
      }
    }

    &:focus-visible {
      ${IconWrapper} {
        box-shadow: ${hexToRGBA($color[1], 0.85)} 0px 0px 0px 2px;
      }
    }
  `};

  ${({ isSelected, $color }) =>
    isSelected &&
    css`
      color: ${$color[1]};
    `};
`;
