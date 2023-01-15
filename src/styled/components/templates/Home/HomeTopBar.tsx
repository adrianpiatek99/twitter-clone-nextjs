import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";

import { IconButton } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { Avatar } from "shared/Avatar";
import { Logo } from "shared/Logo";
import { TopBar, TopBarHeading } from "shared/TopBar";
import styled from "styled-components";

export const HomeTopBar = () => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();

  return (
    <TopBar
      endIcon={
        <IconButton title="Sort tweets" color="secondary" size="large">
          <HiOutlineSparkles />
        </IconButton>
      }
    >
      <HomeTopBarHeading title="Home" />
      {!isUnauthenticated && (
        <TopBarAvatar
          src={session?.user.profile_image_url ?? ""}
          loading={isSessionLoading}
          size="small"
          screenName={session?.user.screen_name ?? ""}
          onClick={() => null}
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
