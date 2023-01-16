import React from "react";

import { useAppSession } from "hooks/useAppSession";
import styled from "styled-components";

import { NavDrawerItem } from "./NavDrawerItem";
import { navDrawerPrimaryItems, navDrawerProfileItem } from "./navDrawerItemsHelper";

interface NavDrawerPrimaryListProps {
  onClose: () => void;
}

export const NavDrawerPrimaryList = ({ onClose }: NavDrawerPrimaryListProps) => {
  const { session } = useAppSession();

  return (
    <ItemList>
      <NavDrawerItem
        {...navDrawerProfileItem}
        href={session?.user.screenName ?? ""}
        onClick={onClose}
      />
      {navDrawerPrimaryItems.map(({ href, ...props }) => (
        <NavDrawerItem key={href} href={href} onClick={onClose} {...props} />
      ))}
    </ItemList>
  );
};

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;
