import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import Link from "next/link";
import styled, { css } from "styled-components";

type TextTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "a";
type TextSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";
type TextWeight = 300 | 400 | 500 | 600 | 700;
type Color = "primary" | "secondary";

interface TextProps extends ComponentPropsWithoutRef<"span"> {
  tag?: TextTag;
  size?: TextSize;
  weight?: TextWeight;
  color?: Color;
  truncate?: boolean;
  href?: string;
}

export const Text = ({
  tag = "span",
  weight = 400,
  size = "m",
  color = "primary",
  href,
  truncate = false,
  ...props
}: TextProps) => {
  const sharedProps = {
    weight,
    size,
    color,
    $truncate: truncate,
    ...props
  };

  if (href) {
    return (
      <StyledLink href={href} {...sharedProps}>
        <TextWrapper as={tag} {...sharedProps} />
      </StyledLink>
    );
  }

  return <TextWrapper as={tag} {...sharedProps} />;
};

type SharedProps = {
  size: TextSize;
  weight: TextWeight;
  color: Color;
  $truncate: boolean;
};

const StyledLink = styled(Link)<SharedProps>`
  color: ${({ theme, color }) => (color === "secondary" ? theme.neutral300 : theme.neutral50)};
  font-weight: ${({ weight }) => weight};
  ${({ theme, size }) => theme.text[size]};

  ${({ $truncate }) =>
    $truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;

const TextWrapper = styled(StyledLink)``;
