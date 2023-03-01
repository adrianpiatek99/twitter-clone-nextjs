import React from "react";

import styled from "styled-components";

import { TrendsSection } from "./TrendsSection";

export const TrendingSidebar = () => {
  return (
    <Container aria-label="Trending">
      <TrendsSection />
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.lg} {
    position: sticky;
    top: 15px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: max-content;
    margin-top: 15px;
    margin-right: 5px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    margin-right: 10px;
  }
`;
