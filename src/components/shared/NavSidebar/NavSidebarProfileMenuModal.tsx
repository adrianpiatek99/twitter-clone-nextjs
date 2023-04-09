import React, { useState } from "react";

import { MenuModal, MenuModalItem } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { EditProfileIcon, LogoutIcon } from "icons/index";
import dynamic from "next/dynamic";

const LazyEditProfileModal = dynamic(
  () => import("components/shared/Modals").then(mod => mod.EditProfileModal),
  {
    ssr: false
  }
);
const LazyConfirmLogOutModal = dynamic(
  () => import("components/shared/Modals").then(mod => mod.ConfirmLogOutModal),
  {
    ssr: false
  }
);

interface NavSidebarProfileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavSidebarProfileMenuModal = ({
  isOpen,
  onClose
}: NavSidebarProfileMenuModalProps) => {
  const { session } = useAppSession();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isConfirmLogOutModalOpen, setIsConfirmLogOutModalOpen] = useState(false);

  const handleCloseConfirmationModal = () => setIsConfirmLogOutModalOpen(false);

  const handleOpenEditProfileModal = () => {
    onClose();
    setIsEditProfileModalOpen(true);
  };

  const handleOpenConfirmLogOutModal = () => {
    onClose();
    setIsConfirmLogOutModalOpen(true);
  };

  return (
    <>
      <MenuModal isOpen={isOpen} onClose={onClose}>
        <MenuModalItem onClick={handleOpenEditProfileModal} startIcon={<EditProfileIcon />}>
          Edit profile
        </MenuModalItem>
        <MenuModalItem
          onClick={handleOpenConfirmLogOutModal}
          color="danger"
          startIcon={<LogoutIcon />}
        >
          Log out
        </MenuModalItem>
      </MenuModal>
      {session && (
        <LazyEditProfileModal
          userData={session.user}
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
      <LazyConfirmLogOutModal
        isOpen={isConfirmLogOutModalOpen}
        onAcceptSuccess={handleCloseConfirmationModal}
        onClose={handleCloseConfirmationModal}
      />
    </>
  );
};
