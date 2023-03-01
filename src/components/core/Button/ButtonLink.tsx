import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import React, { forwardRef } from "react";

import Link from "next/link";
import styled from "styled-components";

import type {
  ButtonColor,
  ButtonElementProps,
  ButtonSize,
  ButtonVariant
} from "./buttonStyleVariants";
import { generalButtonStyles } from "./buttonStyleVariants";

interface ButtonLinkProps extends ComponentPropsWithRef<"a"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  textAlign?: "left" | "center";
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
      textAlign = "center",
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
        $textAlign={textAlign}
        {...props}
        ref={ref}
      >
        {startIcon && startIcon}
        {children}
      </StyledLink>
    );
  }
);

const StyledLink = styled(Link)<ButtonElementProps>`
  ${generalButtonStyles};
  padding: 0 16px;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  }

  &:focus-visible {
    text-decoration: none;
  }
`;
