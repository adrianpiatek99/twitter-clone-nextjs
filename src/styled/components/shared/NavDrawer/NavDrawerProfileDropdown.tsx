import React, { useState } from "react";

import { type DropdownAnchorEl, ConfirmModal, Dropdown, DropdownItem } from "components/core";
import { signOut } from "next-auth/react";

interface NavDrawerProfileDropdownProps {
  anchorEl: DropdownAnchorEl;
  onClose: () => void;
}

export const NavDrawerProfileDropdown = ({ anchorEl, onClose }: NavDrawerProfileDropdownProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleCloseConfirmationModal = () => setIsConfirmModalOpen(false);

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/home"
    });

    handleCloseConfirmationModal();
  };

  const handleLagOutClick = () => {
    setIsConfirmModalOpen(true);
    onClose();
  };

  return (
    <>
      <Dropdown
        anchorEl={anchorEl}
        onClose={onClose}
        autoFocus
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <DropdownItem onClick={handleLagOutClick}>Log out</DropdownItem>
      </Dropdown>
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
