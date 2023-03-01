import React from "react";

import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

export const FollowCellSkeleton = () => {
  return (
    <Wrapper>
      <Skeleton width={48} height={48} variant="circular" />
      <Inner>
        <NamesWrapper>
          <Skeleton width={150} height={15} />
          <Skeleton width={125} height={15} />
        </NamesWrapper>
        <DescriptionRow>
          <Skeleton height={15} />
          <Skeleton width={275} height={15} />
        </DescriptionRow>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 12px 16px;
  gap: 12px;
  width: 100%;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;
