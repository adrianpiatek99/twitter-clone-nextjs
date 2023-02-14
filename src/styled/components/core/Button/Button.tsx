import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import React, { forwardRef } from "react";

import styled, { css } from "styled-components";

import { Loader } from "../Loader";
import type {
  ButtonColor,
  ButtonElementProps,
  ButtonSize,
  ButtonVariant
} from "./buttonStyleVariants";
import { generalButtonStyles } from "./buttonStyleVariants";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  textAlign?: "left" | "center";
}

export const Button = forwardRef(
  (
    {
      children,
      variant = "contained",
      size = "medium",
      color = "primary",
      startIcon,
      loading = false,
      disabled = false,
      fullWidth = false,
      textAlign = "center",
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const loaderColor = color === "primary" ? "secondary" : "primary";

    return (
      <ButtonWrapper
        aria-label={loading ? "Loading" : undefined}
        $loading={loading}
        disabled={loading || disabled}
        $color={color}
        $fullWidth={fullWidth}
        variant={variant}
        size={size}
        $textAlign={textAlign}
        {...props}
        ref={ref}
      >
        {startIcon && !loading && startIcon}
        {loading && (
          <LoaderWrapper>
            <Loader color={loaderColor} />
          </LoaderWrapper>
        )}
        <span>{children}</span>
      </ButtonWrapper>
    );
  }
);

const ButtonWrapper = styled.button<ButtonElementProps & { $loading: boolean }>`
  ${generalButtonStyles};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      & > span {
        opacity: 0;
      }
    `};
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
