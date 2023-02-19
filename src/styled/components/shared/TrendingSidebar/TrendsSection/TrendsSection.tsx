import React from "react";

import { Heading } from "components/core";
import styled from "styled-components";

import { TrendsSectionItem } from "./TrendsSectionItem";

export const TrendsSection = () => {
  return (
    <Section>
      <HeadingWrapper>
        <Heading tag="h2" size="xs" truncate>
          Trends for you
        </Heading>
      </HeadingWrapper>
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
      <TrendsSectionItem />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.background3};
  border-radius: 16px;
`;

const HeadingWrapper = styled.div`
  padding: 12px 16px;
`;
