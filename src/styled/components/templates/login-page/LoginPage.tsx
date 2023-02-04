import React from "react";
import { useState } from "react";

import { Button, LinearProgress } from "components/core";
import GoogleIcon from "icons/GoogleIcon";
import { Logo } from "shared/Logo";
import { Tab, Tabs } from "shared/Tabs";
import { useAppSelector } from "store/store";
import styled from "styled-components";

import { LoginBackgroundImage } from "./LoginBackgroundImage";
import { LoginCurrentTab } from "./LoginCurrentTab";
import { LoginExternalLinks } from "./LoginExternalLinks";

export type LoginTabs = "sign in" | "sign up";

const tabs: LoginTabs[] = ["sign in", "sign up"];

export const LoginPage = () => {
  const { formLoading } = useAppSelector(state => state.pages.defaultPage);
  const [currentTab, setCurrentTab] = useState<LoginTabs>(tabs[0]!);

  const handleChangeTab = (tab: LoginTabs) => {
    setCurrentTab(tab);
  };

  return (
    <Wrapper>
      <LeftPanel>
        <LoginBackgroundImage withBlur />
        <Content>
          {formLoading && <LinearProgress />}
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
      <LoginExternalLinks />
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