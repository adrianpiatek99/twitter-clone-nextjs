import React, { type ComponentPropsWithRef, type Ref, forwardRef, memo } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useDeleteTweetMutation } from "hooks/useDeleteTweetMutation";
import { useLikeTweetMutation } from "hooks/useLikeTweetMutation";
import Link from "next/link";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled, { css, keyframes } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { TweetCardAuthor } from "./TweetCardAuthor";
import { TweetCardToolbar } from "./TweetCardToolbar";

interface TweetCardProps extends Omit<ComponentPropsWithRef<"article">, "id"> {
  isProfile?: boolean;
  start: number;
  tweetData: TweetData;
}

export const TweetCard = memo(
  forwardRef(({ tweetData, start, ...props }: TweetCardProps, ref: Ref<HTMLElement>) => {
    const { id, text, author, createdAt, _count, authorId } = tweetData;
    const { session } = useAppSession();
    const { screenName, profileImageUrl } = author;
    const isOwner = session?.user.id === authorId;
    const { handleDeleteTweet, deleteLoading } = useDeleteTweetMutation({
      tweetData
    });
    const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useLikeTweetMutation({
      tweetData,
      disabled: deleteLoading
    });

    return (
      <TweetArticle
        isLoading={deleteLoading}
        {...props}
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${start}px)`
        }}
      >
        <StyledLink
          href={deleteLoading ? "" : `${screenName}/tweet/${id}`}
          $isLoading={deleteLoading}
          tabIndex={deleteLoading ? -1 : 0}
        />
        {deleteLoading && <Skeleton absolute withoutRadius transparent />}
        <Inner isLoading={deleteLoading}>
          <StyledAvatar src={profileImageUrl} screenName={screenName} size="large" />
          <RightColumn>
            <TweetCardAuthor
              isOwner={isOwner}
              author={author}
              createdAt={createdAt}
              handleDeleteTweet={handleDeleteTweet}
            />
            <Content>
              <TweetText>
                <Text truncate>{text}</Text>
              </TweetText>
              <TweetCardToolbar
                count={_count}
                isLiked={isLiked}
                isLoading={likeLoading || unlikeLoading}
                handleLikeTweet={handleLikeTweet}
              />
            </Content>
          </RightColumn>
        </Inner>
      </TweetArticle>
    );
  })
);

const enterTweetAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TweetArticle = styled.article<{ isLoading: boolean }>`
  position: relative;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;
  animation: ${enterTweetAnimation} 0.3s ease-out;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
    `}
`;

const StyledLink = styled(Link)<{ $isLoading: boolean }>`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
  }
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

const StyledAvatar = styled(Avatar)`
  align-self: flex-start;
  z-index: 1;
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
  gap: 12px;
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
