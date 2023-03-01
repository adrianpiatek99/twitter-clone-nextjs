import React, { useCallback, useState } from "react";

import { MenuModal, MenuModalItem } from "components/core";
import { LogoutIcon } from "icons/index";
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

  const handleCloseConfirmationModal = useCallback(() => setIsConfirmModalOpen(false), []);

  const handleLagOutClick = useCallback(() => {
    onClose();
    setIsConfirmModalOpen(true);
  }, [onClose]);

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
