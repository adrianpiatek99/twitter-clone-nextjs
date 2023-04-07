import React from "react";

import { IconButton } from "components/core";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";
import useProfilePageStore from "store/profilePageStore";
import type { UserData } from "types/user";

interface ProfileTopBarProps {
  userData?: UserData;
  isLoading: boolean;
}

export const ProfileTopBar = ({ userData, isLoading }: ProfileTopBarProps) => {
  const { back } = useRouter();
  const topBarSubheading = useProfilePageStore(state => state.topBarSubheading);

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
        heading={userData ? userData.name : "Profile"}
        subheading={userData ? topBarSubheading : ""}
      />
    </TopBar>
  );
};
