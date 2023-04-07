import React, { useEffect, useLayoutEffect } from "react";

import { Button, LinearProgress } from "components/core";
import { GoogleIcon } from "icons/index";
import { useRouter } from "next/router";
import { Logo } from "shared/Logo";
import { Tab, Tabs } from "shared/Tabs";
import type { AuthPageTabs } from "store/authPageStore";
import useAuthPageStore, { authPageTabs } from "store/authPageStore";
import styled from "styled-components";
import { replaceDashesWithSpaces, replaceSpacesWithDashes } from "utils/strings";
import { shallow } from "zustand/shallow";

import { AuthBackgroundImage } from "./AuthBackgroundImage";
import { AuthCurrentTab } from "./AuthCurrentTab";
import { AuthLinks } from "./AuthLinks";

export const AuthPageTemplate = () => {
  const { pathname, query, push } = useRouter();
  const { currentTab, isLoading, setCurrentTab } = useAuthPageStore(
    state => ({
      currentTab: state.currentTab,
      isLoading: state.isLoading,
      setCurrentTab: state.setCurrentTab
    }),
    shallow
  );

  useEffect(() => {
    if (currentTab) {
      push(
        {
          pathname,
          query: { ...query, tab: replaceSpacesWithDashes(currentTab) }
        },
        undefined,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  useLayoutEffect(() => {
    const queryTab = query.tab;

    if (queryTab) {
      const tab =
        typeof queryTab === "string" ? replaceDashesWithSpaces<AuthPageTabs>(queryTab) : "";

      const tabExists = authPageTabs.find(currentTab => currentTab === tab);

      if (tabExists) {
        setCurrentTab(tabExists);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <LeftPanel>
        <AuthBackgroundImage withBlur />
        <Content>
          {isLoading && <LinearProgress />}
          <Header>
            <Logo size="xl" />
          </Header>
          <TabGroupWrapper>
            <Tabs value={currentTab} onChange={tab => setCurrentTab(tab)}>
              {authPageTabs.map(tab => (
                <Tab key={tab} value={tab} />
              ))}
            </Tabs>
          </TabGroupWrapper>
          <AuthCurrentTab />
          <Button variant="outlined" color="secondary" startIcon={<GoogleIcon />} disabled>
            Sign in with Google
          </Button>
        </Content>
      </LeftPanel>
      <RightPanel>
        <AuthBackgroundImage />
      </RightPanel>
      <AuthLinks />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  @media ${({ theme }) => theme.breakpoints.lg} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LeftPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    justify-content: center;
    padding: 12px;
  }
`;

const RightPanel = styled(LeftPanel)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.lg} {
    position: relative;
    display: flex;

    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 200px;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7) 100%);
      z-index: -1;
    }
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: calc(352px + 2 * 32px);
  gap: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 32px;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.sm} {
    border-radius: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const TabGroupWrapper = styled.div`
  background: ${({ theme }) => theme.background};
`;
