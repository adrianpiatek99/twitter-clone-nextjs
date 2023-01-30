import React, { memo } from "react";

import { IconButton } from "components/core";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import styled, { useTheme } from "styled-components";

interface TweetArticleToolbarProps {
  handleLikeTweet: () => void;
  isLoading: boolean;
  isLiked: boolean;
}

export const TweetArticleToolbar = memo(
  ({ handleLikeTweet, isLoading, isLiked }: TweetArticleToolbarProps) => {
    const { pink400 } = useTheme();
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
          disabled={isLoading}
        >
          {isLiked ? <HeartIcon /> : <HeartOutlinedIcon />}
        </IconButton>
      </Wrapper>
    );
  }
);

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
