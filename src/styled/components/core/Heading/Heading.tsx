import type { ComponentPropsWithoutRef, FC } from "react";

import styled, { css } from "styled-components";

type HeadingSize = "xs" | "s";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingWeight = 300 | 400 | 500 | 600 | 700;

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  tag?: HeadingTag;
  size?: HeadingSize;
  weight?: HeadingWeight;
  withoutMargin?: boolean;
  truncate?: boolean;
}

export const Heading: FC<HeadingProps> = ({
  tag = "h2",
  size = "xs",
  weight = 700,
  truncate = false,
  ...props
}) => {
  return <Wrapper as={tag} size={size} weight={weight} $truncate={truncate} {...props} />;
};

const Wrapper = styled.div<{
  weight?: HeadingWeight;
  size: HeadingSize;
  $truncate: boolean;
}>`
  font-weight: ${({ weight }) => weight};
  ${({ theme, size }) => theme.heading[size]};

  ${({ $truncate }) =>
    $truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;
