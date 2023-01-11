import React from "react";

import { type DropdownAnchorEl, Dropdown, DropdownItem } from "components/core";
import { signOut } from "next-auth/react";

interface HeaderProfileDropdownProps {
  anchorEl: DropdownAnchorEl;
  onClose: () => void;
}

export const HeaderProfileDropdown = ({ anchorEl, onClose }: HeaderProfileDropdownProps) => {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/home"
    });
    onClose();
  };

  return (
    <Dropdown
      anchorEl={anchorEl}
      onClose={onClose}
      autoFocus
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
    </Dropdown>
  );
};
