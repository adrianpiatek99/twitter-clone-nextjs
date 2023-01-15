import React from "react";

import { useRouter } from "next/router";
import styled from "styled-components";

import { authenticatedNavBottomBarItems } from "./navBottomBarHelpers";
import { NavBottomBarLink } from "./NavBottomBarLink";

export const NavBottomBar = () => {
  const { asPath } = useRouter();

  return (
    <Wrapper>
      <Content>
        <NavList>
          {authenticatedNavBottomBarItems.map(({ href, ...props }) => (
            <NavBottomBarLink key={href} href={href} active={asPath.includes(href)} {...props} />
          ))}
        </NavList>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(85, 85, 85, 0.2);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1000;

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: 0px;
    width: 100%;
    height: 1px;
    z-index: 1;
    background-color: ${({ theme }) => theme.border};
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 480px;
  width: 100%;
  min-height: 52px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  z-index: 2;
`;

const NavList = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
