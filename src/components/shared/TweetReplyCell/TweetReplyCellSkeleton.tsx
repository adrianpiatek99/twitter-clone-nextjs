import React from "react";

import { Skeleton } from "components/core";
import styled from "styled-components";
import { createArray } from "utils/array";

export const TweetReplyCellSkeleton = () => {
  return (
    <Wrapper>
      <Inner>
        <Skeleton width={48} height={48} variant="circular" />
        <RightColumn>
          <NamesWrapper>
            <Skeleton width={200} height={15} />
          </NamesWrapper>
          <Skeleton width={150} height={15} />
          <TweetText>
            <Skeleton height={15} />
            <Skeleton width={175} height={15} />
          </TweetText>
          {/* <Toolbar>
            <Skeleton height={15} width={54} />
            <Skeleton height={15} width={54} />
            <Skeleton height={15} width={54} />
          </Toolbar> */}
        </RightColumn>
      </Inner>
    </Wrapper>
  );
};

export const TweetReplyCellSkeletons = () => {
  return (
    <>
      {createArray(7).map(skeleton => (
        <TweetReplyCellSkeleton key={skeleton} />
      ))}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Inner = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const RightColumn = styled.div`
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

const TweetText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// const Toolbar = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 24px;
//   max-width: 425px;
//   width: 100%;
//   padding: 4px 10px;
// `;
