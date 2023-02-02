import type { ComponentPropsWithoutRef } from "react";
import { memo } from "react";
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
  breakWord?: boolean;
}

export const Text = memo(
  ({
    tag = "span",
    weight = 400,
    size = "m",
    color = "primary",
    href,
    truncate = false,
    breakWord = false,
    ...props
  }: TextProps) => {
    const sharedProps = {
      weight,
      size,
      color,
      $truncate: truncate,
      $breakWord: breakWord,
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
  }
);

type SharedProps = {
  size: TextSize;
  weight: TextWeight;
  color: Color;
  $truncate: boolean;
  $breakWord: boolean;
};

const sharedStyles = css<SharedProps>`
  color: ${({ theme, color }) => (color === "secondary" ? theme.neutral300 : theme.neutral50)};
  font-weight: ${({ weight }) => weight};
  ${({ theme, size }) => theme.text[size]};
  word-break: ${({ $breakWord }) => $breakWord && "break-word"};

  ${({ $truncate }) =>
    $truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `};
`;

const StyledLink = styled(Link)`
  ${sharedStyles};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  &:focus-visible {
    text-decoration: underline;
  }
`;

const TextWrapper = styled.span`
  ${sharedStyles};
`;
