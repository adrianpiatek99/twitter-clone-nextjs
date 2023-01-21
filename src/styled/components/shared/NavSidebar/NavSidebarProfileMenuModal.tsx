import React, { useState } from "react";

import { MenuModal, MenuModalItem } from "components/core";
import LogoutIcon from "icons/LogoutIcon";
import { ConfirmLogOutModal } from "shared/Modals";

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

  const handleLagOutClick = () => {
    onClose();
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <MenuModal isOpen={isOpen} onClose={onClose}>
        <MenuModalItem onClick={handleLagOutClick} color="danger" startIcon={<LogoutIcon />}>
          Log out
        </MenuModalItem>
      </MenuModal>
      <ConfirmLogOutModal
        isOpen={isConfirmModalOpen}
        onAcceptSuccess={handleCloseConfirmationModal}
        onClose={handleCloseConfirmationModal}
      />
    </>
  );
};
