import React, { FC } from "react";

import { ButtonLink, IconLinkButton } from "components/core";
import styled from "styled-components";

import { NavSidebarItemType } from "./navSidebarItemsHelper";

interface NavSidebarItemProps extends NavSidebarItemType {
  active: boolean;
}

export const NavSidebarItem: FC<NavSidebarItemProps> = ({
  text,
  href,
  active,
  icon: Icon,
  activeIcon: ActiveIcon
}) => {
  const CorrectIcon = () => {
    return active ? <ActiveIcon /> : <Icon />;
  };

  return (
    <li>
      <NavIconLink title={text} color="white" href={href}>
        <CorrectIcon />
      </NavIconLink>
      <NavSidebarButtonLink
        startIcon={<CorrectIcon />}
        color="secondary"
        variant="text"
        size="large"
        href={href}
        fullWidth
      >
        {text}
      </NavSidebarButtonLink>
    </li>
  );
};

const NavSidebarButtonLink = styled(ButtonLink)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.xl} {
    display: flex;
    justify-content: flex-start;
    min-height: 50px;
    padding: 0 12px;
    border-radius: 50px;
    ${({ theme }) => theme.text.xl};

    & > svg {
      width: 26px;
      height: 26px;
      margin-right: 20px;
    }
  }
`;

const NavIconLink = styled(IconLinkButton)`
  padding: 12px;
  margin: 0 auto;

  & > svg {
    width: 26px;
    height: 26px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    display: none;
  }
`;
