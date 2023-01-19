import React from "react";

import { IconButton } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import SparklesIcon from "icons/SparklesIcon";
import { Avatar } from "shared/Avatar";
import { Logo } from "shared/Logo";
import { TopBar, TopBarHeading } from "shared/TopBar";
import { setNavDrawerOpen } from "store/slices/modalsSlice";
import { useAppDispatch } from "store/store";
import styled from "styled-components";

export const HomeTopBar = () => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();
  const dispatch = useAppDispatch();

  return (
    <TopBar
      endIcon={
        <IconButton title="Sort tweets" color="white" size="large">
          <SparklesIcon />
        </IconButton>
      }
    >
      <HomeTopBarHeading title="Home" />
      {!isUnauthenticated && (
        <TopBarAvatar
          src={session?.user.profileImageUrl ?? ""}
          loading={isSessionLoading}
          size="small"
          onClick={() => dispatch(setNavDrawerOpen(true))}
        />
      )}
      <TopBarLogo color="secondary" />
    </TopBar>
  );
};

const HomeTopBarHeading = styled(TopBarHeading)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
  }
`;

const TopBarAvatar = styled(Avatar)`
  &&& {
    @media ${({ theme }) => theme.breakpoints.sm} {
      display: none;
    }
  }
`;

const TopBarLogo = styled(Logo)`
  @media ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
`;
