import React, { ComponentPropsWithRef, FC, forwardRef, Ref } from "react";

import { Button as MuiButton } from "@mui/material";
import styled, { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { Loader } from "../Loader";
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  sizeVariants,
  styleVariants
} from "./buttonStyleVariants";

interface ButtonProps extends ComponentPropsWithRef<typeof MuiButton> {
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
    return (
      <ButtonElement
        aria-label={loading ? "Loading" : undefined}
        variant={variant}
        color={color}
        size={size}
        loading={loading}
        disabled={loading || disabled}
        {...props}
        ref={ref}
      >
        {loading && (
          <LoaderWrapper>
            <Loader color={color} />
          </LoaderWrapper>
        )}
        <span>{children}</span>
      </ButtonElement>
    );
  }
);

const ButtonElement = styled(MuiButton)<ButtonProps>`
  &&& {
    position: relative;
    min-width: 36px;
    border-radius: 50px;
    overflow-wrap: break-word;
    text-transform: none;
    box-shadow: none;
    transition: all 0.2s;

    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus-visible {
      box-shadow: none;
    }

    ${({ theme }) => theme.text.m};
    ${({ variant }) => styleVariants[variant || "contained"]}
    ${({ size }) => sizeVariants[size || "normal"]}

  ${({ variant, color }) =>
      color === "secondary" &&
      (variant === "contained"
        ? css`
            background-color: ${({ theme }) => theme.neutral20};
            color: ${({ theme }) => theme.darker10};

            &:hover:not(:disabled) {
              background-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.9)}`};
            }

            &:disabled {
              background-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.5)}`};
              color: ${({ theme }) => `${hexToRGBA(theme.darker10, 0.5)}`};
            }
          `
        : css`
            border-color: ${({ theme }) => `${theme.primary05}`};

            &:hover:not(:disabled) {
              border-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.5)}`};
              background-color: ${({ theme }) => `${hexToRGBA(theme.neutral20, 0.1)}`};
            }
          `)};

    ${({ loading }) =>
      loading &&
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
