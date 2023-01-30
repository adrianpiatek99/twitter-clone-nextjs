import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import React, { forwardRef } from "react";

import Link from "next/link";
import styled from "styled-components";

import type { ButtonColor, ButtonSize, ButtonVariant } from "./buttonStyleVariants";
import { buttonVariantsWithColor, sizeVariants } from "./buttonStyleVariants";

interface ButtonLinkProps extends ComponentPropsWithRef<"a"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  fullWidth?: boolean;
}

export const ButtonLink = forwardRef(
  (
    {
      children,
      href,
      variant = "contained",
      size = "medium",
      color = "primary",
      startIcon,
      fullWidth = false,
      ...props
    }: ButtonLinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <StyledLink
        href={href}
        variant={variant}
        size={size}
        $color={color}
        $fullWidth={fullWidth}
        {...props}
        ref={ref}
      >
        {startIcon && startIcon}
        {children}
      </StyledLink>
    );
  }
);

const StyledLink = styled(Link)<
  ButtonLinkProps & {
    $color: ButtonColor;
    $fullWidth: boolean;
  }
>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  padding: 0 16px;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  border-radius: 50px;
  overflow-wrap: break-word;
  text-transform: none;
  font-weight: 500;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, opacity 0.2s;

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

  @media (hover: hover) {
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  }

  &:focus-visible {
    text-decoration: none;
  }
`;
