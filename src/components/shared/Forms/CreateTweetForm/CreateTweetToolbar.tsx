import type { ChangeEvent } from "react";
import { memo } from "react";
import React, { useRef } from "react";

import { Button, IconButton } from "components/core";
import { imageFileTypes } from "constants/fileTypes";
import { EmojiSmileIcon, MediaIcon } from "icons/index";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { CREATE_TWEET_PHOTOS_LIMIT } from "store/createTweetStore";
import styled from "styled-components";

interface CreateTweetToolbarProps {
  tweetLength: number;
  tweetMediaCount: number;
  onSubmit: () => void;
  loading: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isInModal?: boolean;
}

export const CreateTweetToolbar = memo(
  ({
    tweetLength,
    tweetMediaCount,
    onSubmit,
    loading,
    onFileChange,
    isInModal = false
  }: CreateTweetToolbarProps) => {
    const filePickerRef = useRef<HTMLInputElement>(null);
    const isDisabled = !tweetLength;

    const handleFilePicker = () => filePickerRef.current?.click();

    return (
      <Toolbar>
        <ToolbarLeftColumn>
          <IconButton
            title="Media"
            size="small"
            onClick={handleFilePicker}
            disabled={tweetMediaCount >= CREATE_TWEET_PHOTOS_LIMIT || loading}
          >
            <MediaIcon />
          </IconButton>
          <IconButton title="Emoji" size="small" disabled={loading}>
            <EmojiSmileIcon />
          </IconButton>
        </ToolbarLeftColumn>
        <ToolbarRightColumn>
          {!isDisabled && (
            <TweetLength>
              {tweetLength} / {TWEET_MAX_LENGTH}
            </TweetLength>
          )}
          {!isInModal && (
            <Button
              data-testid="tweetButton"
              disabled={isDisabled}
              onClick={onSubmit}
              loading={loading}
            >
              Tweet
            </Button>
          )}
        </ToolbarRightColumn>
        <input
          multiple
          aria-label="Media"
          ref={filePickerRef}
          type="file"
          onChange={onFileChange}
          hidden
          accept={imageFileTypes.toString()}
        />
      </Toolbar>
    );
  }
);

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
  color: ${({ theme }) => theme.neutral300};
  ${({ theme }) => theme.text.s}
`;
