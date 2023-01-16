import React from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton } from "components/core";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";

export const ProfileTopBar = () => {
  const { back } = useRouter();

  return (
    <TopBar
      startIcon={
        <IconButton title="Back" onClick={() => back()} color="secondary">
          <ArrowBackRoundedIcon />
        </IconButton>
      }
    >
      <TopBarHeading title="Profile" subtitle="0 Tweets" />
    </TopBar>
  );
};
