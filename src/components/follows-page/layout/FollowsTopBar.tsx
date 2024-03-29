import React, { useMemo } from "react";

import { IconButton } from "components/core";
import { PROFILE_PAGE_ROUTE } from "constants/routes";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { Tab, Tabs } from "shared/Tabs";
import { TopBar, TopBarHeading } from "shared/TopBar";
import styled from "styled-components";
import type { UserData } from "types/user";
import { hexToRGBA } from "utils/colors";
import { followersPageHref, followingPageHref } from "utils/hrefs";

interface FollowsTopBarProps {
  userData: UserData | undefined;
  userLoading: boolean;
  queryScreenName: string;
}

export const FollowsTopBar = ({ userData, userLoading, queryScreenName }: FollowsTopBarProps) => {
  const { pathname, back } = useRouter();

  const tabValue = useMemo(() => {
    const profilePathname = `${PROFILE_PAGE_ROUTE}/`;

    const profilePage = pathname.replace(profilePathname, "");

    return profilePage;
  }, [pathname]);

  return (
    <TobBarWrapper>
      <TopBar
        loading={userLoading}
        startIcon={
          <IconButton title="Back" onClick={() => back()} color="white">
            <BackIcon />
          </IconButton>
        }
      >
        <TopBarHeading
          heading={userData ? userData.name : "Profile"}
          subheading={`@${queryScreenName}`}
        />
      </TopBar>
      <ProfileFollowsTabs value={tabValue}>
        <Tab value="followers" href={followersPageHref(queryScreenName)} />
        <Tab value="following" href={followingPageHref(queryScreenName)} />
      </ProfileFollowsTabs>
    </TobBarWrapper>
  );
};

const TobBarWrapper = styled.div`
  position: sticky;
  top: 0px;
  background-color: ${({ theme }) => hexToRGBA(theme.background, 0.65)};
  backdrop-filter: blur(12px);
  max-width: 1000px;
  width: 100%;
  z-index: 100;

  & > div {
    background-color: transparent;
    backdrop-filter: blur(0px);
  }
`;

const ProfileFollowsTabs = styled(Tabs)`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
`;
