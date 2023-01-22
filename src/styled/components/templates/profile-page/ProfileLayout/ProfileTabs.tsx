import React from "react";

import styled from "styled-components";

export const ProfileTabs = () => {
  return (
    <Wrapper>
      <span>Tab</span>
      <span>Tab</span>
      <span>Tab</span>
      <span>Tab</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 53px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;
