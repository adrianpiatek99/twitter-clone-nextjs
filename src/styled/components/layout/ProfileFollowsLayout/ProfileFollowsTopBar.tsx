import React, { useMemo } from "react";

import { IconButton } from "components/core";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { Tab, Tabs } from "shared/Tabs";
import { TopBar, TopBarHeading } from "shared/TopBar";
import styled from "styled-components";
import type { UserData } from "types/user";
import { hexToRGBA } from "utils/colors";

interface ProfileFollowsTopBarProps {
  userData: UserData | undefined;
  userLoading: boolean;
  queryScreenName: string;
}

export const ProfileFollowsTopBar = ({
  userData,
  userLoading,
  queryScreenName
}: ProfileFollowsTopBarProps) => {
  const { pathname, back } = useRouter();

  const tabValue = useMemo(() => {
    const profilePathname = "/[screenName]/";

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
          title={userData ? userData.name : "Profile"}
          subtitle={`@${queryScreenName}`}
        />
      </TopBar>
      <ProfileFollowsTabs value={tabValue}>
        <Tab value="followers" linkProps={{ href: `/${queryScreenName}/followers` }} />
        <Tab value="following" linkProps={{ href: `/${queryScreenName}/following` }} />
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
