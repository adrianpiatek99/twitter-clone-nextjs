import React, { useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { MenuModal, MenuModalItem } from "components/core";
import TrashIcon from "icons/TrashIcon";
import { ConfirmDeleteTweetModal } from "shared/Modals/ConfirmDeleteTweetModal";

interface TweetCardMenuProps {
  handleDeleteTweet: () => void;
  isOpen: boolean;
  isOwner: boolean;
  tweetId: TweetData["id"];
  onClose: () => void;
}

export const TweetCardMenu = ({
  isOpen,
  isOwner,
  tweetId,
  onClose,
  handleDeleteTweet
}: TweetCardMenuProps) => {
  const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);

  const handleClickDeleteTweet = () => {
    onClose();
    setIsDeleteTweetModalOpen(true);
  };

  const handleAcceptDeleteTweet = () => {
    setIsDeleteTweetModalOpen(false);

    if (isOwner) {
      handleDeleteTweet();
    }
  };

  return (
    <>
      <MenuModal isOpen={isOpen} onClose={onClose}>
        <>
          {isOwner && (
            <MenuModalItem
              color="danger"
              startIcon={<TrashIcon />}
              onClick={handleClickDeleteTweet}
            >
              Delete Tweet
            </MenuModalItem>
          )}
        </>
      </MenuModal>
      <ConfirmDeleteTweetModal
        isOpen={isDeleteTweetModalOpen}
        onAcceptSuccess={handleAcceptDeleteTweet}
        onClose={() => setIsDeleteTweetModalOpen(false)}
        tweetId={tweetId}
      />
    </>
  );
};
