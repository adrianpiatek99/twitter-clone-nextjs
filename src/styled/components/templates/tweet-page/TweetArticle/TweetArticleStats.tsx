import React from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import styled from "styled-components";

interface TweetArticleStatsProps {
  tweetData: TweetData;
}

export const TweetArticleStats = ({ tweetData: { _count } }: TweetArticleStatsProps) => {
  const likeCount = _count.likes;
  const showStats = !!likeCount;

  return showStats ? (
    <Wrapper>
      {!!likeCount && (
        <LikeCountRow>
          <Text weight={700}>{likeCount} </Text>
          <Text color="secondary" weight={500}>
            Likes
          </Text>
        </LikeCountRow>
      )}
    </Wrapper>
  ) : null;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 16px;
  padding: 12px 4px;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const LikeCountRow = styled.div``;
