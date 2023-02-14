import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import styled from "styled-components";

interface TopBarHeadingProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  subtitle?: string;
}

export const TopBarHeading = ({ title, subtitle, ...props }: TopBarHeadingProps) => {
  return (
    <Heading {...props}>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Heading>
  );
};

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-grow: 1;
  min-width: 0px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    gap: 2px;
  }
`;

const Title = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.text.l};
  color: ${({ theme }) => theme.neutral100};

  @media ${({ theme }) => theme.breakpoints.sm} {
    ${({ theme }) => theme.heading.xs}
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.neutral300};
  ${({ theme }) => theme.text.xs};
`;
