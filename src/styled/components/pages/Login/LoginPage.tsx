import React from "react";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { Button, LinearProgress } from "components/core";
import { Logo } from "shared/Logo";
import { Tab, TabGroup } from "shared/Tabs";
import { useAppSelector } from "store/store";
import styled from "styled-components";

import { LoginBackgroundGif } from "./LoginBackgroundGif";
import { LoginCurrentTab } from "./LoginCurrentTab";

export type LoginTabs = "sign in" | "sign up";

const tabs: LoginTabs[] = ["sign in", "sign up"];

const LoginPage = () => {
  const { formLoading } = useAppSelector(state => state.pages.defaultPage);
  const [currentTab, setCurrentTab] = useState<LoginTabs>(tabs[0]);

  const handleChangeTab = (tab: LoginTabs) => setCurrentTab(tab);

  return (
    <Wrapper>
      <LeftPanel>
        <LoginBackgroundGif withBlur />
        <Content>
          {formLoading && <LinearProgress />}
          <Header>
            <Logo size="xl" />
          </Header>
          <TabGroupWrapper>
            <TabGroup
              variant="fullWidth"
              value={currentTab}
              onChange={(_, tab: LoginTabs) => handleChangeTab(tab)}
            >
              {tabs.map(tab => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </TabGroup>
          </TabGroupWrapper>
          <LoginCurrentTab currentTab={currentTab} handleChangeTab={handleChangeTab} />
          <Button variant="outlined" startIcon={<GoogleIcon />} disabled>
            Sign in with Google
          </Button>
        </Content>
      </LeftPanel>
      <RightPanel>
        <LoginBackgroundGif />
      </RightPanel>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-height: 100vh;

  @media ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LeftPanel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  width: 100%;
  height: 100%;
`;

const RightPanel = styled(LeftPanel)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.lg} {
    display: flex;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: calc(352px + 2 * 32px);
  gap: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  border-radius: 16px;
  padding: 32px;
  overflow: hidden;
`;

const TabGroupWrapper = styled.div`
  background: ${({ theme }) => theme.background};
`;
