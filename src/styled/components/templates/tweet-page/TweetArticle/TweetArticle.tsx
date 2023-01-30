import React, { memo } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { Loader, Text } from "components/core";
import { useDeleteTweetMutation } from "hooks/useDeleteTweetMutation";
import { useLikeTweetMutation } from "hooks/useLikeTweetMutation";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getFormattedDate } from "utils/timeUtils";

import { TweetArticleAuthor } from "./TweetArticleAuthor";
import { TweetArticleStats } from "./TweetArticleStats";
import { TweetArticleToolbar } from "./TweetArticleToolbar";

interface TweetArticleProps {
  tweetData: TweetData;
  isOwner: boolean;
}

export const TweetArticle = memo(({ isOwner, tweetData }: TweetArticleProps) => {
  const { text, createdAt } = tweetData;
  const { replace } = useRouter();
  const { handleDeleteTweet, deleteLoading } = useDeleteTweetMutation({
    tweetData,
    onSuccess: () => {
      replace("/home");
    }
  });
  const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useLikeTweetMutation({
    tweetData,
    disabled: deleteLoading
  });

  return (
    <>
      {deleteLoading && (
        <DeleteLoader>
          <Loader />
        </DeleteLoader>
      )}
      <TweetArticleWrapper>
        <Inner>
          <TweetArticleAuthor
            tweetData={tweetData}
            isOwner={isOwner}
            handleDeleteTweet={handleDeleteTweet}
          />
          <TweetText>
            <Text size="xxl">{text}</Text>
          </TweetText>
          <TimeRow>
            <Text color="secondary" weight={500}>
              {getFormattedDate(createdAt, "HH:mm")} {" · "}
              {getFormattedDate(createdAt, "MM/DD/YYYY")}
            </Text>
          </TimeRow>
          <TweetArticleStats tweetData={tweetData} />
          <TweetArticleToolbar
            handleLikeTweet={handleLikeTweet}
            isLoading={likeLoading || unlikeLoading}
            isLiked={isLiked}
          />
        </Inner>
      </TweetArticleWrapper>
    </>
  );
});

const DeleteLoader = styled.div`
  position: absolute;
  inset: 0px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
`;

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
