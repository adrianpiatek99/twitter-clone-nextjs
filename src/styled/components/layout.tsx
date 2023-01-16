import React, { ReactNode } from "react";

import { useRouter } from "next/router";
import { NavBottomBar } from "shared/NavBottomBar";
import { NavDrawer } from "shared/NavDrawer";
import { NavSidebar } from "shared/NavSidebar";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

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
