import React from "react";

import { Button } from "components/core";
import styled from "styled-components";

export const DefaultPageExternalLinks = () => {
  return (
    <Wrapper>
      <Button color="secondary" size="small">
        External Links
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 12px;
  margin-top: auto;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: absolute;
    bottom: 0px;
  }
`;
