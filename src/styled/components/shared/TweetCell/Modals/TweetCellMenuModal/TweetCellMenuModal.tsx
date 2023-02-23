import React, { useState } from "react";

import { MenuModal, MenuModalItem } from "components/core";
import { useDeleteTweetMutation } from "hooks/useDeleteTweetMutation";
import TrashIcon from "icons/TrashIcon";
import { ConfirmDeleteTweetModal } from "shared/Modals";
import type { TweetData } from "types/tweet";

interface TweetCellMenuModalProps {
  tweetData: TweetData;
  isOpen: boolean;
  isOwner: boolean;
  onClose: () => void;
  onDeleteSuccess?: () => void;
}

export const TweetCellMenuModal = ({
  tweetData,
  isOpen,
  isOwner,
  onClose,
  onDeleteSuccess
}: TweetCellMenuModalProps) => {
  const [isDeleteTweetModalOpen, setIsDeleteTweetModalOpen] = useState(false);
  const { handleDeleteTweet, deleteLoading } = useDeleteTweetMutation({
    tweetData,
    onSuccess: () => {
      onDeleteSuccess?.();
      setIsDeleteTweetModalOpen(false);
    }
  });

  const handleClickDeleteTweet = () => {
    onClose();
    setIsDeleteTweetModalOpen(true);
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
          onAcceptSuccess={handleDeleteTweet}
          loading={deleteLoading}
          onClose={() => setIsDeleteTweetModalOpen(false)}
        />
      )}
    </>
  );
};
