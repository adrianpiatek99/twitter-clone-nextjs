import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import React, { forwardRef, useMemo } from "react";

import styled, { css, useTheme } from "styled-components";

import { Tooltip } from "..";
import type { IconButtonColor, IconButtonElementProps, IconButtonSize } from "./iconButtonVariants";
import { generalIconButtonStyles } from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "color"> {
  children: ReactNode;
  title?: string;
  size?: IconButtonSize;
  color?: IconButtonColor;
  loading?: boolean;
  isError?: boolean;
  isSelected?: boolean;
  disableFocus?: boolean;
}

export const IconButton = forwardRef(
  (
    {
      children,
      title = "",
      size = "medium",
      color = "primary",
      isError = false,
      loading = false,
      isSelected = false,
      disableFocus = false,
      ...props
    }: IconButtonProps,
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
          type="button"
          $color={iconButtonColors}
          size={size}
          $isError={isError}
          $loading={loading}
          isSelected={isSelected}
          tabIndex={disableFocus ? -1 : 0}
          {...props}
          ref={ref}
        >
          {children}
        </ButtonElement>
      </Tooltip>
    );
  }
);

const ButtonElement = styled.button<
  IconButtonElementProps & { isSelected: boolean; $isError: boolean; $loading: boolean }
>`
  ${generalIconButtonStyles};

  &:disabled {
    opacity: 0.5;
  }

  ${({ $isError }) =>
    $isError &&
    css`
      cursor: default;

      &:active:not(:disabled) {
        transform: none;
      }
    `};

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.65;
      cursor: default;
    `};

  ${({ isSelected, $color }) =>
    isSelected &&
    css`
      color: ${$color[1]};
    `};
`;
