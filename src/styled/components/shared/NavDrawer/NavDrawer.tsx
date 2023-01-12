import React from "react";

import { useAppSession } from "hooks/useAppSession";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  authenticatedNavDrawerItems,
  navDrawerHomeItem,
  navDrawerProfileItem
} from "./navDrawerHelpers";
import { NavDrawerLink } from "./NavDrawerLink";
import { NavDrawerLogo } from "./NavDrawerLogo";
import { NavDrawerProfile } from "./NavDrawerProfile";

export const NavDrawer = () => {
  const { session, isAuthenticated } = useAppSession();
  const { pathname, asPath } = useRouter();

  return (
    <Wrapper>
      <Inner>
        <NavWrapper>
          <NavDrawerLogo />
          <NavList>
            <NavDrawerLink
              {...navDrawerHomeItem}
              active={asPath.includes(navDrawerHomeItem.href)}
            />
            {isAuthenticated && (
              <>
                {authenticatedNavDrawerItems.map(({ href, ...props }) => (
                  <NavDrawerLink key={href} href={href} active={asPath.includes(href)} {...props} />
                ))}
                <NavDrawerLink
                  {...navDrawerProfileItem}
                  href={session?.user?.screen_name ?? ""}
                  active={pathname === navDrawerProfileItem.href}
                />
              </>
            )}
          </NavList>
        </NavWrapper>
        <NavDrawerProfile />
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
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
