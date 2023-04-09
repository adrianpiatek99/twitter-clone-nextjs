import React from "react";

import { Skeleton } from "components/core";
import styled from "styled-components";
import { createArray } from "utils/array";

interface TweetCellSkeletonProps {
  isEven?: boolean;
}

export const TweetCellSkeleton = ({ isEven = false }: TweetCellSkeletonProps) => {
  return (
    <Wrapper>
      <Inner>
        <Skeleton width={48} height={48} variant="circular" />
        <RightColumn>
          <NamesWrapper>
            <Skeleton width={200} height={15} />
          </NamesWrapper>
          <TweetText>
            <Skeleton height={15} />
            {!isEven && <Skeleton height={15} />}
            <Skeleton width={175} height={15} />
          </TweetText>
          {!isEven && (
            <ImageWrapper>
              <Skeleton absolute />
            </ImageWrapper>
          )}
          <Toolbar>
            <Skeleton height={15} width={54} />
            <Skeleton height={15} width={54} />
            <Skeleton height={15} width={54} />
          </Toolbar>
        </RightColumn>
      </Inner>
    </Wrapper>
  );
};

export const TweetCellSkeletons = () => {
  return (
    <>
      {createArray(3).map(skeleton => (
        <TweetCellSkeleton key={skeleton} isEven={skeleton % 2 === 0} />
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
  gap: 6px;
  width: 100%;
  margin-top: 2px;
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

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  margin-top: 6px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  max-width: 425px;
  width: 100%;
  padding: 4px 10px;
  margin-top: 6px;
`;
