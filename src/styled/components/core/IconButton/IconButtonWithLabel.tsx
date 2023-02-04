import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import React, { forwardRef, useMemo } from "react";

import styled, { css, useTheme } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { Tooltip } from "..";
import { Text } from "../Text";
import type { IconButtonColor } from "./iconButtonVariants";
import { iconButtonSizeVariants } from "./iconButtonVariants";

interface IconLinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  label: string;
  title?: string;
  color?: IconButtonColor;
  isSelected?: boolean;
  isError?: boolean;
  disableFocus?: boolean;
}

export const IconButtonWithLabel = forwardRef(
  (
    {
      children,
      label,
      title = "",
      color = "primary",
      isError = false,
      isSelected = false,
      ...props
    }: IconLinkButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, white, neutral300, error40 } = useTheme();

    const iconButtonColors = useMemo((): [string, string] => {
      if (isError) return [error40, error40];

      if (color === "primary") return [primary05, primary05];

      if (color === "secondary") return [neutral300, primary05];

      if (color === "white") return [white, white];

      return [neutral300, color];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, color]);

    return (
      <Tooltip content={title}>
        <ButtonElement
          aria-label={title}
          $color={iconButtonColors}
          isSelected={isSelected}
          {...props}
          ref={ref}
        >
          <IconWrapper>{children}</IconWrapper>
          <LabelWrapper>
            <Text>{label}</Text>
          </LabelWrapper>
        </ButtonElement>
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
  transition: background-color 0.2s;
  ${iconButtonSizeVariants["medium"]};
`;

const ButtonElement = styled.button<{
  $color: [string, string];
  isSelected: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  ${({ $color }) => css`
    color: ${$color[0]};

    @media (hover: hover) {
      &:hover:not(:disabled) {
        color: ${$color[1]};

        ${IconWrapper} {
          background-color: ${hexToRGBA($color[1], 0.1)};
        }
      }
    }

    &:active:not(:disabled) {
      ${IconWrapper} {
        background-color: ${hexToRGBA($color[1], 0.2)};
      }
    }

    &:focus-visible {
      color: ${$color[1]};

      ${IconWrapper} {
        background-color: ${hexToRGBA($color[1], 0.1)};
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

const LabelWrapper = styled.div`
  position: absolute;
  padding: 0 12px;
  left: 26px;

  & > span {
    color: inherit;
  }
`;
