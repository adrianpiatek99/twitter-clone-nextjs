import React from "react";

import { IconButton, IconButtonWithLabel } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { UseLikeTweetMutationReturn } from "hooks/useLikeTweetMutation";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import styled, { useTheme } from "styled-components";

interface TweetCardToolbarProps {
  likeTweetMutation: UseLikeTweetMutationReturn;
  likeCount: number;
}

export const TweetCardToolbar = ({
  likeCount,
  likeTweetMutation: { likeLoading, unlikeLoading, isLiked, handleLikeTweet }
}: TweetCardToolbarProps) => {
  const { isUnauthenticated } = useAppSession();
  const { pink400 } = useTheme();
  const likeCountLabel = likeCount ? String(likeCount) : "";
  const loadingLikeButton = likeLoading || unlikeLoading || isUnauthenticated;
  const likeTitle = isLiked ? "Unlike" : "Like";

  return (
    <Wrapper>
      <IconButton color="secondary">
        <MessageIcon />
      </IconButton>
      <IconButtonWithLabel
        title={likeTitle}
        label={likeCountLabel}
        onClick={handleLikeTweet}
        color={pink400}
        isSelected={isLiked}
        disabled={loadingLikeButton}
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
