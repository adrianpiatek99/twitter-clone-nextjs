import React from "react";

import { IconButton, Text } from "components/core";
import EmojiSmileIcon from "icons/EmojiSmileIcon";
import MediaIcon from "icons/MediaIcon";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import styled from "styled-components";

interface CreateTweetModalToolbarProps {
  tweetLength: number;
}

export const CreateTweetModalToolbar = ({ tweetLength }: CreateTweetModalToolbarProps) => {
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
        {!!tweetLength && (
          <Text size="s" color="secondary">
            {tweetLength} / {TWEET_MAX_LENGTH}
          </Text>
        )}
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
