import React from "react";

import { useAppSession } from "hooks/useAppSession";
import { useRouter } from "next/router";
import styled from "styled-components";

import { NavSidebarItem } from "./NavSidebarItem";
import {
  authenticatedNavSidebarItems,
  navSidebarHomeItem,
  navSidebarProfileItem
} from "./navSidebarItemsHelper";
import { NavSidebarLogo } from "./NavSidebarLogo";
import { NavSidebarProfile } from "./NavSidebarProfile";

export const NavSidebar = () => {
  const { session, isAuthenticated } = useAppSession();
  const { pathname, asPath } = useRouter();
  const isProfileItemActive =
    pathname.includes(navSidebarProfileItem.href) &&
    asPath.includes(session?.user.screenName ?? "") &&
    !pathname.includes("tweet");

  return (
    <Container>
      <Wrapper>
        <Inner>
          <NavWrapper>
            <NavSidebarLogo />
            <NavList>
              <NavSidebarItem
                {...navSidebarHomeItem}
                active={asPath.includes(navSidebarHomeItem.href)}
              />
              {isAuthenticated && (
                <>
                  {authenticatedNavSidebarItems.map(({ href, ...props }) => (
                    <NavSidebarItem
                      key={href}
                      href={href}
                      active={asPath.includes(href)}
                      {...props}
                    />
                  ))}
                  {session && (
                    <NavSidebarItem
                      {...navSidebarProfileItem}
                      href={`/${session.user.screenName}`}
                      active={isProfileItemActive}
                    />
                  )}
                </>
              )}
            </NavList>
          </NavWrapper>
          <NavSidebarProfile />
        </Inner>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    max-width: 88px;
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-width: 275px;
  }
`;

const Wrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: fixed;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 88px;
    width: 100%;
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
  gap: 8px 0px;
  width: 100%;
`;
