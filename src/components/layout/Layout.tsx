import type { ReactElement } from "react";
import React from "react";

import { useAppSession } from "hooks/useAppSession";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Logo } from "shared/Logo";
import { NavBottomBar } from "shared/NavBottomBar";
import { NavSidebar } from "shared/NavSidebar";
import { TrendingSidebar } from "shared/TrendingSidebar";
import styled, { keyframes } from "styled-components";

import { ProfileFollowsLayout } from "./ProfileFollowsLayout";
import { ProfileLayout } from "./ProfileLayout";

const LazyNavDrawer = dynamic(() => import("../shared/NavDrawer").then(mod => mod.NavDrawer), {
  ssr: false
});
const LazyAuthenticationBar = dynamic(
  () => import("../shared/AuthenticationBar").then(mod => mod.AuthenticationBar),
  {
    ssr: false
  }
);
const LazyAuthenticationRequiredModal = dynamic(
  () =>
    import("../shared/Modals/AuthenticationRequiredModal").then(
      mod => mod.AuthenticationRequiredModal
    ),
  {
    ssr: false
  }
);

interface LayoutProps {
  children: ReactElement;
}

const CurrentLayoutPattern = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const isProfileFollowsPage =
    pathname.includes("/[screenName]/following") || pathname.includes("/[screenName]/followers");
  const isTweetPage = pathname.includes("/[screenName]/tweet/");
  const isProfilePage = pathname.includes("/[screenName]") && !isTweetPage && !isProfileFollowsPage;

  if (isProfilePage) {
    return <ProfileLayout>{children}</ProfileLayout>;
  }

  if (isProfileFollowsPage) {
    return <ProfileFollowsLayout>{children}</ProfileFollowsLayout>;
  }

  return children;
};

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();
  const { isSessionLoading, isUnauthenticated } = useAppSession();

  if (pathname === "/") return children;

  if (isSessionLoading) {
    return (
      <SessionLoadingWrapper>
        <Logo color="secondary" size="xl" />
      </SessionLoadingWrapper>
    );
  }

  return (
    <Container>
      <NavSidebar />
      <Main>
        <Feed>
          <CurrentLayoutPattern>{children}</CurrentLayoutPattern>
        </Feed>
        <TrendingSidebar />
      </Main>
      <NavBottomBar />
      <LazyNavDrawer />
      <LazyAuthenticationRequiredModal />
      {isUnauthenticated && <LazyAuthenticationBar />}
    </Container>
  );
};

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

const Container = styled.div`
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

const Main = styled.main`
  position: relative;
  display: flex;
  flex-grow: 1;
  width: 100%;
  gap: 30px;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
  min-width: 0px;
  padding-bottom: 100px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    border-left: 1px solid ${({ theme }) => theme.border};
    border-right: 1px solid ${({ theme }) => theme.border};
    padding-bottom: 200px;
    max-width: 600px;
  }
`;
