import React from "react";

import { useAppSession } from "hooks/useAppSession";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  authenticatedNavSidebarItems,
  navSidebarHomeItem,
  navSidebarProfileItem
} from "./navSidebarHelpers";
import { NavSidebarLink } from "./NavSidebarLink";
import { NavSidebarLogo } from "./NavSidebarLogo";
import { NavSidebarProfile } from "./NavSidebarProfile";

export const NavSidebar = () => {
  const { session, isAuthenticated } = useAppSession();
  const { pathname, asPath } = useRouter();

  return (
    <Wrapper>
      <Inner>
        <NavWrapper>
          <NavSidebarLogo />
          <NavList>
            <NavSidebarLink
              {...navSidebarHomeItem}
              active={asPath.includes(navSidebarHomeItem.href)}
            />
            {isAuthenticated && (
              <>
                {authenticatedNavSidebarItems.map(({ href, ...props }) => (
                  <NavSidebarLink
                    key={href}
                    href={href}
                    active={asPath.includes(href)}
                    {...props}
                  />
                ))}
                <NavSidebarLink
                  {...navSidebarProfileItem}
                  href={session?.user.screenName ?? ""}
                  active={pathname === navSidebarProfileItem.href}
                />
              </>
            )}
          </NavList>
        </NavWrapper>
        <NavSidebarProfile />
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: sticky;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    max-width: 88px;
    height: 100vh;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-width: 275px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 12px;
  gap: 8px;
  height: 100%;
  width: 100%;
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.xl} {
    align-items: flex-start;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px 0px;
  width: 100%;
  align-items: center;
`;
