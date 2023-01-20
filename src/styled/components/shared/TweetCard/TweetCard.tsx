import React from "react";

import { QueryClient } from "@tanstack/react-query";
import { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

import { TweetCardAuthor } from "./TweetCardAuthor";
import { TweetCardToolbar } from "./TweetCardToolbar";

interface TweetCardProps extends TweetData {
  queryClient: QueryClient;
  isProfile?: boolean;
  userId: string | undefined;
}

export const TweetCard = ({
  queryClient,
  id,
  text,
  createdAt,
  userId,
  author,
  likes,
  _count
}: TweetCardProps) => {
  const { screenName, profileImageUrl } = author;
  const likeCount = _count.likes;
  const isOwner = userId === author.id;

  return (
    <TweetArticle tabIndex={0}>
      <LeftColumn>
        <Avatar src={profileImageUrl} screenName={screenName} size="large" />
      </LeftColumn>
      <RightColumn>
        <TweetCardAuthor tweetId={id} createdAt={createdAt} isOwner={isOwner} author={author} />
        <Content>
          <TweetText>
            <Text>{text}</Text>
          </TweetText>
          <TweetCardToolbar
            tweetId={id}
            likes={likes}
            likeCount={likeCount}
            queryClient={queryClient}
          />
        </Content>
      </RightColumn>
    </TweetArticle>
  );
};

const TweetArticle = styled.article`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  outline: none;
  transition: 0.2s;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
  }
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
