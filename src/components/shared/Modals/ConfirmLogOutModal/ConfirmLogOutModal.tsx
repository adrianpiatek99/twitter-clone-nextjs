import React from "react";

import { ConfirmModal } from "components/core";
import { HOME_PAGE_ROUTE } from "constants/routes";
import { signOut } from "next-auth/react";

interface ConfirmLogOutModalProps {
  isOpen: boolean;
  onAcceptSuccess?: () => void;
  onClose: () => void;
}

export const ConfirmLogOutModal = ({
  isOpen,
  onAcceptSuccess,
  onClose
}: ConfirmLogOutModalProps) => {
  const handleLogOut = () => {
    signOut({
      callbackUrl: HOME_PAGE_ROUTE
    });

    onAcceptSuccess?.();
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onAccept={handleLogOut}
      onClose={onClose}
      heading="Log out of Twitter?"
      text="You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account."
      acceptButtonText="Log out"
    />
  );
};
