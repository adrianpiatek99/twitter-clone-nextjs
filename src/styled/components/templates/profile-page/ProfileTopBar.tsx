import React from "react";

import { UserData } from "api/user/userByScreenName";
import { IconButton } from "components/core";
import BackIcon from "icons/BackIcon";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";

interface ProfileTopBarProps {
  userData?: UserData;
  isLoading: boolean;
}

export const ProfileTopBar = ({ userData, isLoading }: ProfileTopBarProps) => {
  const { back } = useRouter();
  const tweetCount = userData?._count.tweets ?? 0;

  return (
    <TopBar
      loading={isLoading}
      startIcon={
        <IconButton title="Back" onClick={() => back()} color="white">
          <BackIcon />
        </IconButton>
      }
    >
      <TopBarHeading
        title={!userData ? "Profile" : userData.name}
        subtitle={!userData ? "" : `${String(tweetCount)} Tweets`}
      />
    </TopBar>
  );
};
