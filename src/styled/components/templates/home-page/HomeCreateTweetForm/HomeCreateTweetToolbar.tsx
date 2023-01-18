import React from "react";

import { Button, IconButton } from "components/core";
import EmojiSmileIcon from "icons/EmojiSmileIcon";
import MediaIcon from "icons/MediaIcon";
import styled from "styled-components";

interface HomeCreateTweetToolbarProps {
  tweetLength: number;
  onSubmit: () => void;
  loading: boolean;
}

export const HomeCreateTweetToolbar = ({
  tweetLength,
  onSubmit,
  loading
}: HomeCreateTweetToolbarProps) => {
  const isDisabled = !tweetLength;

  return (
    <Toolbar>
      <ToolbarLeftColumn>
        <IconButton title="Media" size="small">
          <MediaIcon />
        </IconButton>
        <IconButton title="Emoji" size="small">
          <EmojiSmileIcon />
        </IconButton>
      </ToolbarLeftColumn>
      <ToolbarRightColumn>
        {!isDisabled && <TweetLength>{tweetLength} / 250</TweetLength>}
        <Button disabled={isDisabled} onClick={onSubmit} loading={loading}>
          Tweet
        </Button>
      </ToolbarRightColumn>
    </Toolbar>
  );
};

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0 10px;
`;

const ToolbarLeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: -6px;
`;

const ToolbarRightColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 0 15px;
`;

const TweetLength = styled.span`
  color: ${({ theme }) => theme.neutral100};
  ${({ theme }) => theme.text.s}
`;
