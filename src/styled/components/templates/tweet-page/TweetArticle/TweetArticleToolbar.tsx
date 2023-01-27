import React from "react";

import { IconButton } from "components/core";
import type { UseLikeTweetMutationReturn } from "hooks/useLikeTweetMutation";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import styled, { useTheme } from "styled-components";

interface TweetArticleToolbarProps {
  likeTweetMutation: UseLikeTweetMutationReturn;
}

export const TweetArticleToolbar = ({
  likeTweetMutation: { likeLoading, unlikeLoading, isLiked, handleLikeTweet }
}: TweetArticleToolbarProps) => {
  const { pink400 } = useTheme();
  const loadingLikeButton = likeLoading || unlikeLoading;
  const likeTitle = isLiked ? "Unlike" : "Like";

  return (
    <Wrapper>
      <IconButton color="secondary">
        <MessageIcon />
      </IconButton>
      <IconButton
        title={likeTitle}
        onClick={handleLikeTweet}
        color={pink400}
        isSelected={isLiked}
        disabled={loadingLikeButton}
      >
        {isLiked ? <HeartIcon /> : <HeartOutlinedIcon />}
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 425px;
  width: 100%;
  margin: 0 auto;
  gap: 12px;
  z-index: 1;
`;
