import React from "react";

import { Text } from "components/core";
import { useToggleLikeTweetMutation } from "hooks/useToggleLikeTweetMutation";
import { TweetCellMedia } from "shared/TweetCell";
import styled from "styled-components";
import type { TweetData } from "types/tweet";
import { convertDateToLocalTime, getFormattedDate } from "utils/time";

import { TweetArticleAuthor } from "./TweetArticleAuthor";
import { TweetArticleStats } from "./TweetArticleStats";
import { TweetArticleToolbar } from "./TweetArticleToolbar";

interface TweetArticleProps {
  tweetData: TweetData;
  isOwner: boolean;
}

export const TweetArticle = ({ isOwner, tweetData }: TweetArticleProps) => {
  const { text, createdAt, media } = tweetData;
  const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useToggleLikeTweetMutation({
    tweetData
  });

  return (
    <TweetArticleWrapper>
      <Inner>
        <TweetArticleAuthor tweetData={tweetData} isOwner={isOwner} />
        <TweetText>
          <Text size="xxl">{text}</Text>
        </TweetText>
        {!!media.length && <TweetCellMedia media={media} />}
        <TimeRow>
          <Text color="secondary" weight={500}>
            {convertDateToLocalTime(createdAt)} {" · "}
            {getFormattedDate(createdAt, "MM/DD/YYYY")}
          </Text>
        </TimeRow>
        <TweetArticleStats tweetData={tweetData} />
        <TweetArticleToolbar
          tweetData={tweetData}
          handleLikeTweet={handleLikeTweet}
          isLoading={likeLoading || unlikeLoading}
          isLiked={isLiked}
        />
      </Inner>
    </TweetArticleWrapper>
  );
};

const TweetArticleWrapper = styled.article`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
  margin-top: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  outline: none;
  transition: background-color 0.2s, opacity 0.2s;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  transition: opacity 0.2s, transform 0.2s;
`;

const TweetText = styled.div`
  display: inline-block;
  width: 98%;
  max-height: 550px;
  white-space: pre-line;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > span {
    display: inline;
    white-space: pre-line;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
`;
