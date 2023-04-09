import React from "react";

import { Skeleton } from "components/core";
import styled from "styled-components";

export const TweetArticleSkeleton = () => {
  return (
    <TweetArticleWrapper>
      <Inner>
        <AuthorContent>
          <Skeleton width={48} height={48} variant="circular" />
          <NamesWrapper>
            <Skeleton width={150} height={15} />
            <Skeleton width={125} height={15} />
          </NamesWrapper>
        </AuthorContent>
        <TweetText>
          <Skeleton height={23} />
          <Skeleton height={23} />
          <Skeleton width={200} height={23} />
        </TweetText>
        <ImageWrapper>
          <Skeleton absolute />
        </ImageWrapper>
        <TimeRow>
          <Skeleton width={175} height={15} />
        </TimeRow>
        <StatsRow>
          <Skeleton width={60} height={15} />
          <Skeleton width={60} height={15} />
        </StatsRow>
        <Toolbar>
          <Skeleton height={20} width={54} />
          <Skeleton height={20} width={54} />
          <Skeleton height={20} width={54} />
        </Toolbar>
      </Inner>
    </TweetArticleWrapper>
  );
};

const TweetArticleWrapper = styled.article`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const AuthorContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  gap: 6px;
  margin: 7px 0;
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const TimeRow = styled.div``;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  max-width: 425px;
  margin: 0 auto;
  width: 100%;
`;
