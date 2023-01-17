import React, { ReactNode } from "react";

import { useAppSession } from "hooks/useAppSession";
import { useRouter } from "next/router";
import { Logo } from "shared/Logo";
import { NavBottomBar } from "shared/NavBottomBar";
import { NavDrawer } from "shared/NavDrawer";
import { NavSidebar } from "shared/NavSidebar";
import styled, { keyframes } from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();
  const { isSessionLoading } = useAppSession();

  if (isSessionLoading) {
    return (
      <SessionLoadingWrapper>
        <Logo color="secondary" size="xl" />
      </SessionLoadingWrapper>
    );
  }

  if (asPath === "/") return <>{children}</>;

  return (
    <Wrapper>
      <NavDrawer />
      <NavSidebar />
      <Feed>{children}</Feed>
      <NavBottomBar />
    </Wrapper>
  );
};

export default Layout;

const LogoEnterAnimation = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.25);
    }
    100% {
      transform: none;
    }
`;

const SessionLoadingWrapper = styled.div`
  position: fixed;
  inset: 0px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.background};
  animation: ${LogoEnterAnimation} 0.3s;
`;

const Wrapper = styled.main`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;

  @media ${({ theme }) => theme.breakpoints.md} {
    max-width: 688px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    max-width: 1008px;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-width: 1265px;
  }
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    border-left: 1px solid ${({ theme }) => theme.border};
    border-right: 1px solid ${({ theme }) => theme.border};
  }
`;