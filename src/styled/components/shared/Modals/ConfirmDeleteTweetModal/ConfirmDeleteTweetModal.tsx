import React from "react";

import { ConfirmModal } from "components/core";

interface ConfirmDeleteTweetModalProps {
  isOpen: boolean;
  onAcceptSuccess: () => void;
  onClose: () => void;
  loading: boolean;
}

export const ConfirmDeleteTweetModal = ({
  isOpen,
  onAcceptSuccess,
  onClose,
  loading
}: ConfirmDeleteTweetModalProps) => {
  return (
    <ConfirmModal
      heading="Delete Tweet"
      text="Are you sure you want to delete this Tweet?"
      isOpen={isOpen}
      onAccept={onAcceptSuccess}
      onClose={onClose}
      acceptButtonText="Delete"
      loading={loading}
    />
  );
};
