import React from "react";

import { useAppSession } from "hooks/useAppSession";
import { Avatar } from "shared/Avatar";
import { Logo } from "shared/Logo";
import { TopBar, TopBarHeading } from "shared/TopBar";
import useGlobalStore from "store/globalStore";
import styled from "styled-components";

export const HomeTopBar = () => {
  const { session, isSessionLoading } = useAppSession();
  const openNavDrawer = useGlobalStore(store => store.openNavDrawer);

  return (
    <TopBar>
      <Column>
        <HomeTopBarHeading heading="Home" />
        {session && (
          <TopBarAvatar
            src={session.user.profileImageUrl}
            loading={isSessionLoading}
            size="small"
            onClick={() => openNavDrawer(true)}
          />
        )}
      </Column>
      <Column>
        <TopBarLogo color="secondary" />
      </Column>
      <Column />
    </TopBar>
  );
};

const HomeTopBarHeading = styled(TopBarHeading)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    flex-basis: 50%;
  }
`;

const TopBarAvatar = styled(Avatar)`
  @media ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
`;

const TopBarLogo = styled(Logo)`
  @media ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
`;

const Column = styled.div`
  display: flex;
  flex-basis: 50%;

  &:nth-child(2) {
    flex-basis: auto;
  }
`;
