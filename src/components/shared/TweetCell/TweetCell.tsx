import React, { type ComponentPropsWithRef, type Ref, forwardRef, memo } from "react";

import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useToggleLikeTweetMutation } from "hooks/useToggleLikeTweetMutation";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";
import type { TweetData } from "types/tweet";

import { TweetCellActions } from "./TweetCellActions";
import { TweetCellMedia } from "./TweetCellMedia";
import { TweetCellToolbar } from "./TweetCellToolbar";

interface TweetCellProps extends Omit<ComponentPropsWithRef<"article">, "id"> {
  start: number;
  tweetData: TweetData;
}

export const TweetCell = memo(
  forwardRef(({ tweetData, start, ...props }: TweetCellProps, ref: Ref<HTMLDivElement>) => {
    const { id, text, author, authorId, media } = tweetData;
    const { session } = useAppSession();
    const { screenName, profileImageUrl } = author;
    const isOwner = session?.user.id === authorId;
    const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useToggleLikeTweetMutation({
      tweetData
    });

    return (
      <TweetArticle
        tag="article"
        role="article"
        label="Tweet"
        href={{ pathname: "/[screenName]/tweet/[tweetId]", query: { tweetId: id, screenName } }}
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
        <Inner>
          <StyledAvatar src={profileImageUrl} screenName={screenName} size="large" />
          <RightColumn>
            <TweetCellActions tweetData={tweetData} isOwner={isOwner} />
            <Content>
              <TweetText>
                <Text truncate>{text}</Text>
              </TweetText>
              {!!media.length && <TweetCellMedia media={media} />}
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

const TweetArticle = styled(ActionCard)`
  border-bottom: 1px solid ${({ theme }) => theme.border};

  & > a {
    z-index: 1;
  }
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  transition: opacity 0.2s, transform 0.2s;
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
