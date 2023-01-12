import React, { ReactElement } from "react";

import { useRouter } from "next/router";
import { NavDrawer } from "shared/NavDrawer";
import styled from "styled-components";

interface LayoutProps {
  children: ReactElement | ReactElement[];
}

const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter();

  if (asPath === "/") return <>{children}</>;

  return (
    <Wrapper>
      <NavDrawer />
      <Feed>{children}</Feed>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
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
  border-left: 1px solid ${({ theme }) => theme.border};
  border-right: 1px solid ${({ theme }) => theme.border};
  max-width: 600px;
  width: 100%;
`;
