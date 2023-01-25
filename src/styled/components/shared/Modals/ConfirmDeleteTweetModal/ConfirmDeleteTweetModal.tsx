import React from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { ConfirmModal } from "components/core";

interface ConfirmDeleteTweetModalProps {
  isOpen: boolean;
  tweetId: TweetData["id"];
  onAcceptSuccess: () => void;
  onClose: () => void;
}

export const ConfirmDeleteTweetModal = ({
  isOpen,
  onAcceptSuccess,
  onClose
}: ConfirmDeleteTweetModalProps) => {
  return (
    <ConfirmModal
      heading="Delete Tweet"
      text="Are you sure you want to delete this Tweet?"
      isOpen={isOpen}
      onAccept={onAcceptSuccess}
      onClose={onClose}
      acceptButtonText="Delete"
    />
  );
};
