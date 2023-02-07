import React, { type ComponentPropsWithRef, type Ref, forwardRef, memo } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useDeleteTweetMutation } from "hooks/useDeleteTweetMutation";
import { useLikeTweetMutation } from "hooks/useLikeTweetMutation";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled, { css } from "styled-components";

import { TweetCellActions } from "./TweetCellActions";
import { TweetCellToolbar } from "./TweetCellToolbar";

interface TweetCellProps extends Omit<ComponentPropsWithRef<"article">, "id"> {
  isProfile?: boolean;
  start: number;
  tweetData: TweetData;
}

export const TweetCell = memo(
  forwardRef(({ tweetData, start, ...props }: TweetCellProps, ref: Ref<HTMLDivElement>) => {
    const { id, text, author, createdAt, authorId } = tweetData;
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
        tag="article"
        isLoading={deleteLoading}
        href={`${screenName}/tweet/${id}`}
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
        {deleteLoading && <Skeleton absolute withoutRadius transparent />}
        <Inner isLoading={deleteLoading}>
          <StyledAvatar src={profileImageUrl} screenName={screenName} size="large" />
          <RightColumn>
            <TweetCellActions
              isOwner={isOwner}
              author={author}
              createdAt={createdAt}
              handleDeleteTweet={handleDeleteTweet}
            />
            <Content>
              <TweetText>
                <Text truncate>{text}</Text>
              </TweetText>
              <TweetCellToolbar
                tweetData={tweetData}
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

const TweetArticle = styled(ActionCard)<{ isLoading: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.border};

  & > a {
    z-index: 1;
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
