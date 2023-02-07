import React from "react";

import { useAppSession } from "hooks/useAppSession";
import Link from "next/link";
import styled from "styled-components";

import { NavDrawerItem } from "./NavDrawerItem";
import { navDrawerProfileItem } from "./navDrawerItems";

interface NavDrawerPrimaryListProps {
  onClose: () => void;
}

export const NavDrawerPrimaryList = ({ onClose }: NavDrawerPrimaryListProps) => {
  const { session } = useAppSession();

  return (
    <ItemList>
      <StyledLink href={`/${session?.user.screenName}`} tabIndex={-1}>
        <NavDrawerItem {...navDrawerProfileItem} onClick={onClose} />
      </StyledLink>
    </ItemList>
  );
};

const StyledLink = styled(Link)`
  width: 100%;
`;

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
`;
