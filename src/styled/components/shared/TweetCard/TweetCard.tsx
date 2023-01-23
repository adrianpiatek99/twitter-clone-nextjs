import React from "react";

import { QueryClient } from "@tanstack/react-query";
import { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useDeleteTweetMutation } from "hooks/useDeleteTweetMutation";
import { useLikeTweetMutation } from "hooks/useLikeTweetMutation";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled, { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { TweetCardAuthor } from "./TweetCardAuthor";
import { TweetCardToolbar } from "./TweetCardToolbar";

interface TweetCardProps extends TweetData {
  queryClient: QueryClient;
  isProfile?: boolean;
}

export const TweetCard = ({
  queryClient,
  id,
  text,
  createdAt,
  author,
  likes,
  _count
}: TweetCardProps) => {
  const { session } = useAppSession();
  const userId = session?.user.id;
  const { screenName, profileImageUrl } = author;
  const { handleDeleteTweet, deleteLoading } = useDeleteTweetMutation({
    queryClient,
    tweetId: id,
    userId: userId ?? ""
  });
  const likeTweetMutation = useLikeTweetMutation({
    queryClient,
    tweetId: id,
    userId: userId ?? "",
    likes,
    disabled: deleteLoading
  });
  const likeCount = _count.likes;
  const isOwner = userId === author.id;

  return (
    <TweetArticle isLoading={deleteLoading} tabIndex={deleteLoading ? -1 : 0}>
      {deleteLoading && <Skeleton absolute withoutRadius transparent />}
      <Inner isLoading={deleteLoading}>
        <LeftColumn>
          <Avatar src={profileImageUrl} screenName={screenName} size="large" />
        </LeftColumn>
        <RightColumn>
          <TweetCardAuthor
            tweetId={id}
            createdAt={createdAt}
            isOwner={isOwner}
            author={author}
            handleDeleteTweet={handleDeleteTweet}
          />
          <Content>
            <TweetText>
              <Text>{text}</Text>
            </TweetText>
            <TweetCardToolbar likeCount={likeCount} likeTweetMutation={likeTweetMutation} />
          </Content>
        </RightColumn>
      </Inner>
    </TweetArticle>
  );
};

const TweetArticle = styled.article<{ isLoading: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  outline: none;
  cursor: pointer;
  transition: 0.2s;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }
  }

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
    `}
`;

const Inner = styled.div<{ isLoading: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  transition: opacity 0.2s, transform 0.2s;

  ${({ isLoading }) =>
    isLoading &&
    css`
      position: relative;
      transform: scale(0.96);
      opacity: 0.6;

      &::after {
        content: "";
        position: absolute;
        inset: 0px;
      }
    `}
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2px;
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
    display: inline-block;
    white-space: pre-line;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
