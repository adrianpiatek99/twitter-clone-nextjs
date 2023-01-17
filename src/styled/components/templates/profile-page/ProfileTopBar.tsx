import React from "react";

import { IconButton } from "components/core";
import BackIcon from "icons/BackIcon";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";

export const ProfileTopBar = () => {
  const { back } = useRouter();

  return (
    <TopBar
      startIcon={
        <IconButton title="Back" onClick={() => back()} color="secondary">
          <BackIcon />
        </IconButton>
      }
    >
      <TopBarHeading title="Profile" subtitle="0 Tweets" />
    </TopBar>
  );
};
