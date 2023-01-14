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
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  padding: 12px;
`;
