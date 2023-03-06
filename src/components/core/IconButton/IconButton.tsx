import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import React, { forwardRef } from "react";

import { Tooltip } from "shared/Tooltip";
import styled, { css } from "styled-components";

import type { IconButtonColor, IconButtonElementProps, IconButtonSize } from "./iconButtonVariants";
import { generalIconButtonStyles } from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "color"> {
  children: ReactNode;
  title?: string;
  size?: IconButtonSize;
  color?: IconButtonColor;
  customColor?: string;
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
      customColor,
      isError = false,
      loading = false,
      isSelected = false,
      disableFocus = false,
      ...props
    }: IconButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Tooltip content={title}>
        <ButtonElement
          aria-label={title}
          type="button"
          color={color}
          customColor={customColor}
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
