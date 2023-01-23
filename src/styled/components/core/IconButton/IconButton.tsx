import React, { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref, useMemo } from "react";

import styled, { css, useTheme } from "styled-components";

import {
  getIconButtonColor,
  IconButtonColor,
  IconButtonSize,
  iconButtonSizeVariants
} from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "color"> {
  children: ReactNode;
  title?: string;
  size?: IconButtonSize;
  color?: IconButtonColor;
  loading?: boolean;
  isError?: boolean;
  disableFocus?: boolean;
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    {
      children,
      title = "",
      size = "medium",
      color = "primary",
      isError = false,
      loading = false,
      disableFocus = false,
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
      <ButtonElement
        aria-label={title}
        title={title}
        type="button"
        $color={iconButtonColors}
        size={size}
        $isError={isError}
        $loading={loading}
        tabIndex={disableFocus ? -1 : 0}
        {...props}
        ref={ref}
      >
        {children}
      </ButtonElement>
    );
  }
);

const ButtonElement = styled.button<
  IconButtonProps & { $color: [string, string]; $isError: boolean; $loading: boolean }
>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s;

  &:disabled {
    opacity: 0.5;
  }

  ${({ $color }) => getIconButtonColor($color)};
  ${({ size }) => iconButtonSizeVariants[size || "medium"]};

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
`;
