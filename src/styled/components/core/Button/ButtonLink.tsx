import React, { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref } from "react";

import Link from "next/link";
import styled from "styled-components";

import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  buttonVariantsWithColor,
  sizeVariants
} from "./buttonStyleVariants";

interface ButtonLinkProps extends ComponentPropsWithRef<"a"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  fullWidth?: boolean;
}

export const ButtonLink: FC<ButtonLinkProps> = forwardRef(
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
    },
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
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

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

  &:hover:not(:disabled),
  &:focus-visible {
    text-decoration: none;
  }
`;
