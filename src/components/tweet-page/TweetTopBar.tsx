import React from "react";

import { IconButton } from "components/core";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";

export const TweetTopBar = () => {
  const { back } = useRouter();

  return (
    <TopBar
      startIcon={
        <IconButton onClick={back} color="white">
          <BackIcon />
        </IconButton>
      }
    >
      <TopBarHeading heading={"Tweet"} />
    </TopBar>
  );
};
