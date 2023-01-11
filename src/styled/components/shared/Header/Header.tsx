import React from "react";

import { useAppSession } from "hooks/useAppSession";
import { useRouter } from "next/router";
import styled from "styled-components";

import { headerNavItems } from "./headerHelpers";
import { HeaderLink } from "./HeaderLink";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderProfile } from "./HeaderProfile";

export const Header = () => {
  const { isAuthenticated } = useAppSession();
  const { pathname, asPath } = useRouter();

  return (
    <HeaderWrapper>
      <Inner>
        <InnerRow>
          <HeaderLogo />
          <NavWrapper>
            {isAuthenticated ? (
              <>
                {headerNavItems.slice(0, -1).map(({ href, ...props }) => (
                  <HeaderLink key={href} href={href} active={asPath.includes(href)} {...props} />
                ))}
                {headerNavItems.slice(-1).map(({ href, ...props }) => (
                  <HeaderLink
                    key={href}
                    href={"/Sharpedov"}
                    active={pathname === href}
                    {...props}
                  />
                ))}
              </>
            ) : (
              headerNavItems
                .slice(0, 1)
                .map(({ href, ...props }) => (
                  <HeaderLink key={href} href={href} active={asPath.includes(href)} {...props} />
                ))
            )}
          </NavWrapper>
        </InnerRow>
        <InnerRow>
          <HeaderProfile />
        </InnerRow>
      </Inner>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  max-width: 88px;
  height: 100vh;

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

const InnerRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.xl} {
    align-items: flex-start;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px 0px;
  width: 100%;
  align-items: center;
`;
