import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import styled from "styled-components";

interface TopBarHeadingProps extends ComponentPropsWithoutRef<"div"> {
  heading: string;
  subheading?: string;
}

export const TopBarHeading = ({ heading, subheading, ...props }: TopBarHeadingProps) => {
  return (
    <HeadingWrapper {...props}>
      <Heading>{heading}</Heading>
      {subheading && <Subheading>{subheading}</Subheading>}
    </HeadingWrapper>
  );
};

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex-grow: 1;
  min-width: 0px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    gap: 2px;
  }
`;

const Heading = styled.h2`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  ${({ theme }) => theme.text.l};
  color: ${({ theme }) => theme.neutral100};

  @media ${({ theme }) => theme.breakpoints.sm} {
    ${({ theme }) => theme.heading.xs}
  }
`;

const Subheading = styled.span`
  color: ${({ theme }) => theme.neutral300};
  ${({ theme }) => theme.text.xs};
`;
