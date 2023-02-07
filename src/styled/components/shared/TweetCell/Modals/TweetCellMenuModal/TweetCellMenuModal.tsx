import React, { memo, useState } from "react";

import { MenuModal, MenuModalItem } from "components/core";
import TrashIcon from "icons/TrashIcon";
import { ConfirmDeleteTweetModal } from "shared/Modals";

interface TweetCellMenuModalProps {
  isOpen: boolean;
  isOwner: boolean;
  onClose: () => void;
  handleDeleteTweet: () => void;
}

export const TweetCellMenuModal = memo(
  ({ isOpen, isOwner, onClose, handleDeleteTweet }: TweetCellMenuModalProps) => {
    const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);

    const handleClickDeleteTweet = () => {
      onClose();
      setIsDeleteTweetModalOpen(true);
    };

    const handleAcceptDeleteTweet = () => {
      setIsDeleteTweetModalOpen(false);

      handleDeleteTweet();
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
        {isOwner && (
          <ConfirmDeleteTweetModal
            isOpen={isDeleteTweetModalOpen}
            onAcceptSuccess={handleAcceptDeleteTweet}
            onClose={() => setIsDeleteTweetModalOpen(false)}
          />
        )}
      </>
    );
  }
);
