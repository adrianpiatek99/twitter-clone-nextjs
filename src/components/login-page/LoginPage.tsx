import React, { useLayoutEffect } from "react";
import { useState } from "react";

import { Button, LinearProgress } from "components/core";
import { GoogleIcon } from "icons/index";
import { useRouter } from "next/router";
import { Logo } from "shared/Logo";
import { Tab, Tabs } from "shared/Tabs";
import useLoginStore from "store/loginStore";
import styled from "styled-components";

import { LoginBackgroundImage } from "./LoginBackgroundImage";
import { LoginCurrentTab } from "./LoginCurrentTab";
import { LoginLinks } from "./LoginLinks";

export type LoginTabs = "sign in" | "sign up";

const tabs: LoginTabs[] = ["sign in", "sign up"];

export const LoginPage = () => {
  const isLoading = useLoginStore(state => state.isLoading);
  const { pathname, query, push } = useRouter();
  const [currentTab, setCurrentTab] = useState<LoginTabs>(tabs[0]!);

  const handleChangeTab = (tab: LoginTabs) => {
    setCurrentTab(tab);
    push(
      {
        pathname,
        query: { ...query, tab: tab.replace(" ", "-") }
      },
      undefined,
      { shallow: true }
    );
  };

  useLayoutEffect(() => {
    const queryTab = query.tab;

    if (queryTab) {
      const tab = typeof queryTab === "string" ? (queryTab.replace("-", " ") as LoginTabs) : "";

      const tabExists = tabs.find(currentTab => currentTab === tab);

      if (tabExists) {
        setCurrentTab(tabExists);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <LeftPanel>
        <LoginBackgroundImage withBlur />
        <Content>
          {isLoading && <LinearProgress />}
          <Header>
            <Logo size="xl" />
          </Header>
          <TabGroupWrapper>
            <Tabs value={currentTab} onChange={handleChangeTab}>
              {tabs.map(tab => (
                <Tab key={tab} value={tab} />
              ))}
            </Tabs>
          </TabGroupWrapper>
          <LoginCurrentTab currentTab={currentTab} handleChangeTab={handleChangeTab} />
          <Button variant="outlined" color="secondary" startIcon={<GoogleIcon />} disabled>
            Sign in with Google
          </Button>
        </Content>
      </LeftPanel>
      <RightPanel>
        <LoginBackgroundImage />
      </RightPanel>
      <LoginLinks />
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
