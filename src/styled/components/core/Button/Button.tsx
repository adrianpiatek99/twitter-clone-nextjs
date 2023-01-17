import React, { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from "react";

import Link from "next/link";
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
  href?: string;
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
      href,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const loaderColor = color === "primary" ? "secondary" : "primary";
    const sharedProps = {
      $color: color,
      $fullWidth: fullWidth,
      variant,
      size
    };

    return href ? (
      <StyledLink href={href} {...sharedProps} {...(props as typeof Link)}>
        {startIcon && !loading && startIcon}
        <span>{children}</span>
      </StyledLink>
    ) : (
      <ButtonWrapper
        aria-label={loading ? "Loading" : undefined}
        $loading={loading}
        disabled={loading || disabled}
        {...sharedProps}
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

const sharedStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  padding: 0 16px;
  background-color: transparent;
  border: none;
  border-radius: 50px;
  overflow-wrap: break-word;
  text-transform: none;
  font-weight: 500;
  outline: none;
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
`;

const StyledLink = styled(Link)<
  ButtonProps & {
    $color: ButtonColor;
    $fullWidth: boolean;
  }
>`
  ${sharedStyles};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:hover:not(:disabled),
  &:focus-visible {
    text-decoration: none;
  }

  ${({ theme }) => theme.text.m};
  ${({ size }) => sizeVariants[size || "normal"]};
  ${({ $color, variant }) => buttonVariantsWithColor[variant || "contained"][$color]};
`;

const ButtonWrapper = styled.button<
  ButtonProps & {
    $loading: boolean;
    $color: ButtonColor;
    $fullWidth: boolean;
  }
>`
  ${sharedStyles};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ theme }) => theme.text.m};
  ${({ size }) => sizeVariants[size || "normal"]};
  ${({ $color, variant }) => buttonVariantsWithColor[variant || "contained"][$color]};

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
