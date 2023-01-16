import React, { useState } from "react";

import { ConfirmLogOutModal } from "shared/Modals";
import styled from "styled-components";

import { navDrawerLogOutItem } from "./navDrawerIcons";
import { NavDrawerItem } from "./NavDrawerItem";

interface NavDrawerSecondaryListProps {
  onClose: () => void;
}

export const NavDrawerSecondaryList = ({ onClose }: NavDrawerSecondaryListProps) => {
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const onLogOutModalAccept = () => {
    setIsLogOutModalOpen(false);
    onClose();
  };

  return (
    <>
      <ItemList>
        <NavDrawerSecondaryItem
          {...navDrawerLogOutItem}
          onClick={() => setIsLogOutModalOpen(true)}
          size="large"
        />
      </ItemList>
      <ConfirmLogOutModal
        isOpen={isLogOutModalOpen}
        onClose={() => setIsLogOutModalOpen(false)}
        onAcceptSuccess={onLogOutModalAccept}
      />
    </>
  );
};

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavDrawerSecondaryItem = styled(NavDrawerItem)`
  & > svg {
    width: 20px;
    height: 20px;
  }
`;
