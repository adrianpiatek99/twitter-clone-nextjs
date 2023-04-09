import React from "react";

import { PersonOutlinedIcon } from "icons/index";
import Link from "next/link";
import styled from "styled-components";
import type { UserData } from "types/user";
import { profilePageHref } from "utils/hrefs";

import { NavDrawerItem } from "./NavDrawerItem";

interface NavDrawerPrimaryListProps {
  userData: UserData;
  onClose: () => void;
}

export const NavDrawerPrimaryList = ({ userData, onClose }: NavDrawerPrimaryListProps) => {
  return (
    <ItemList>
      <StyledLink href={profilePageHref(userData.screenName)} tabIndex={-1}>
        <NavDrawerItem text="Profile" icon={PersonOutlinedIcon} onClick={onClose} />
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
