import React, { useState } from "react";

import { ConfirmModal, MenuModal, MenuModalItem } from "components/core";
import { signOut } from "next-auth/react";

interface NavSidebarProfileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavSidebarProfileMenuModal = ({
  isOpen,
  onClose
}: NavSidebarProfileMenuModalProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleCloseConfirmationModal = () => setIsConfirmModalOpen(false);

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/home"
    });

    handleCloseConfirmationModal();
  };

  const handleLagOutClick = () => {
    onClose();
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <MenuModal isOpen={isOpen} onClose={onClose}>
        <MenuModalItem onClick={handleLagOutClick}>Log out</MenuModalItem>
      </MenuModal>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmationModal}
        onAccept={handleSignOut}
        heading="Log out of Twitter?"
        text="You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account."
        acceptButtonText="Log out"
      />
    </>
  );
};
