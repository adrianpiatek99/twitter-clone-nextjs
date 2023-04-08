import React, { memo } from "react";

import { ButtonLink, IconLinkButton } from "components/core";
import type { LinkProps } from "next/link";
import styled from "styled-components";

import type { NavSidebarItemType } from "./navSidebarItemsHelper";

interface NavSidebarItemProps extends Omit<NavSidebarItemType, "route"> {
  active: boolean;
  href: LinkProps["href"];
}

export const NavSidebarItem = memo(
  ({ text, href, active, icon: Icon, activeIcon: ActiveIcon }: NavSidebarItemProps) => {
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
  }
);

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
