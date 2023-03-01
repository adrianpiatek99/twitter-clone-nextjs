import React from "react";

import styled from "styled-components";

export const TrendsSectionItem = () => {
  return (
    <ItemContainer>
      <FirstRow />
      <SecondRow />
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 5px;
`;

const FirstRow = styled.div`
  height: 15px;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
`;

const SecondRow = styled(FirstRow)`
  height: 13px;
  width: 35%;
`;
