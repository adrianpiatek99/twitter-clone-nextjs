import React from "react";

import styled from "styled-components";

interface TopBarHeadingProps {
  title: string;
  subtitle?: string;
}

export const TopBarHeading = ({ title, subtitle }: TopBarHeadingProps) => {
  return (
    <Heading>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Heading>
  );
};

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    gap: 2px;
  }
`;

const Title = styled.h2`
  ${({ theme }) => theme.text.l}
  color: ${({ theme }) => theme.neutral40};

  @media ${({ theme }) => theme.breakpoints.sm} {
    ${({ theme }) => theme.heading.xs}
  }
`;

const Subtitle = styled.span`
  color: ${({ theme }) => theme.neutral100};
  ${({ theme }) => theme.text.xs};
`;
