import React, { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from "react";

import styled, { css } from "styled-components";

import { Loader } from "../Loader";
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  buttonVariantsWithColor,
  sizeVariants
} from "./buttonStyleVariants";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
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
      ...props
    },
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

const ButtonWrapper = styled.button<
  ButtonProps & {
    $loading: boolean;
    $color: ButtonColor;
    $fullWidth: boolean;
  }
>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-width: 36px;
  padding: 0 16px;
  border-radius: 50px;
  overflow-wrap: break-word;
  text-transform: none;
  font-weight: 500;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: 0.2s;

  & > span {
    font-family: ${({ theme }) => theme.fontFamily.primary};
  }

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }

  ${({ theme }) => theme.text.m};
  ${({ size }) => sizeVariants[size || "normal"]};
  ${({ $color, variant }) => buttonVariantsWithColor[variant || "contained"][$color]};

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
