import React, { useMemo } from "react";

import { IconButton } from "components/core";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { TopBar, TopBarHeading } from "shared/TopBar";
import type { UserData } from "types/user";

interface ProfileTopBarProps {
  userData?: UserData;
  isLoading: boolean;
}

export const ProfileTopBar = ({ userData, isLoading }: ProfileTopBarProps) => {
  const { pathname, back } = useRouter();
  const tweetCount = userData?._count.tweets ?? 0;
  const likesCount = userData?._count.likes ?? 0;

  const getHeadingSubTitle = useMemo(() => {
    if (pathname === "/[screenName]/with_replies") return `0 Tweets`;

    if (pathname === "/[screenName]/media") return `0 Photos & videos`;

    if (pathname === "/[screenName]/likes") return `${likesCount} Likes`;

    return `${tweetCount} Tweets`;
  }, [pathname, likesCount, tweetCount]);

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
        title={userData ? userData.name : "Profile"}
        subtitle={userData ? getHeadingSubTitle : ""}
      />
    </TopBar>
  );
};
