import React, { ComponentPropsWithRef, FC, forwardRef, Ref } from "react";

import { Button as MuiButton } from "@mui/material";
import styled, { css } from "styled-components";

import { Loader } from "../Loader";
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  buttonVariantsWithColor,
  sizeVariants
} from "./buttonStyleVariants";

interface ButtonProps extends Omit<ComponentPropsWithRef<typeof MuiButton>, "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
  (
    {
      variant = "contained",
      size = "medium",
      color = "primary",
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const loaderColor = color === "primary" ? "primary" : "secondary";

    return (
      <ButtonElement
        aria-label={loading ? "Loading" : undefined}
        $color={color}
        variant={variant}
        size={size}
        $loading={loading}
        disabled={loading || disabled}
        {...props}
        ref={ref}
      >
        {loading && (
          <LoaderWrapper>
            <Loader color={loaderColor} />
          </LoaderWrapper>
        )}
        <span>{children}</span>
      </ButtonElement>
    );
  }
);

const ButtonElement = styled(MuiButton)<{
  $loading: boolean;
  $color: ButtonColor;
  variant: ButtonVariant;
}>`
  &&& {
    position: relative;
    min-width: 36px;
    border-radius: 50px;
    overflow-wrap: break-word;
    text-transform: none;
    padding-top: 0px;
    padding-bottom: 0px;
    box-shadow: none;
    transition: all 0.2s;

    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus-visible {
      box-shadow: none;
    }

    &:disabled {
      opacity: 0.5;
    }

    ${({ theme }) => theme.text.m};
    ${({ size }) => sizeVariants[size || "normal"]};

    ${({ $color, variant }) => buttonVariantsWithColor[variant][$color]};

    ${({ $loading }) =>
      $loading &&
      css`
        & > span {
          opacity: 0;
        }
      `};
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
