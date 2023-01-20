import React from "react";

import { QueryClient } from "@tanstack/react-query";
import { TweetData } from "api/tweet/timelineTweets";
import { IconButton, IconButtonWithLabel } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useLikeTweet } from "hooks/useLikeTweet";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import styled, { useTheme } from "styled-components";

interface TweetCardToolbarProps {
  queryClient: QueryClient;
  tweetId: TweetData["id"];
  likes: TweetData["likes"];
  likeCount: number;
}

export const TweetCardToolbar = ({
  queryClient,
  tweetId,
  likeCount,
  likes
}: TweetCardToolbarProps) => {
  const { session, isUnauthenticated } = useAppSession();
  const userId = session?.user?.id;
  const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useLikeTweet({
    queryClient,
    tweetId,
    userId,
    likes
  });
  const likeCountLabel = likeCount ? String(likeCount) : "";

  const { pink400 } = useTheme();

  const loadingLikeButton = likeLoading || unlikeLoading;

  return (
    <Wrapper>
      <IconButton color="secondary">
        <MessageIcon />
      </IconButton>
      <IconButtonWithLabel
        title={isLiked ? "Unlike" : "Like"}
        label={likeCountLabel}
        onClick={handleLikeTweet}
        color={pink400}
        isSelected={isLiked}
        disabled={loadingLikeButton || isUnauthenticated}
      >
        {isLiked ? <HeartIcon /> : <HeartOutlinedIcon />}
      </IconButtonWithLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 425px;
  width: 100%;
  margin-top: 12px;
  gap: 12px;
`;
