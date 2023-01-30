import React, { memo } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, IconButtonWithLabel } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import styled, { useTheme } from "styled-components";

interface TweetCardToolbarProps {
  count: TweetData["_count"];
  isLoading: boolean;
  isLiked: boolean;
  handleLikeTweet: () => void;
}

export const TweetCardToolbar = memo(
  ({ handleLikeTweet, isLoading, isLiked, count: { likes: likeCount } }: TweetCardToolbarProps) => {
    const { isUnauthenticated } = useAppSession();
    const { pink400 } = useTheme();
    const likeCountLabel = likeCount ? String(likeCount) : "";
    const loadingLikeButton = isLoading || isUnauthenticated;
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
  }
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: max-content;
  gap: 12px;
  z-index: 1;
`;
