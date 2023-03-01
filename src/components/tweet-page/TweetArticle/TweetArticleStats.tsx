import React from "react";

import { Text } from "components/core";
import styled from "styled-components";
import type { TweetData } from "types/tweet";

interface TweetArticleStatsProps {
  tweetData: TweetData;
}

export const TweetArticleStats = ({ tweetData }: TweetArticleStatsProps) => {
  const {
    _count: { replies, likes }
  } = tweetData;
  const showStats = !!likes || !!replies;

  return showStats ? (
    <Wrapper>
      {!!replies && (
        <LikeCountRow>
          <Text weight={700}>{replies} </Text>
          <Text color="secondary" weight={500}>
            Replies
          </Text>
        </LikeCountRow>
      )}
      {!!likes && (
        <LikeCountRow>
          <Text weight={700}>{likes} </Text>
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
  gap: 8px 16px;
  padding: 12px 4px;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const LikeCountRow = styled.div``;
