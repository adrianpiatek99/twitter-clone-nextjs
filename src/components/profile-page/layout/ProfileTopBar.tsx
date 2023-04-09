import React, { useMemo } from "react";

import { IconButton } from "components/core";
import {
  LIKES_PAGE_ROUTE,
  MEDIA_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  WITH_REPLIES_PAGE_ROUTE
} from "constants/routes";
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

  const topBarSubheading = useMemo(() => {
    if (userData) {
      if (pathname === PROFILE_PAGE_ROUTE) return `${tweetCount} Tweets`;

      if (pathname === WITH_REPLIES_PAGE_ROUTE) return `${tweetCount} Tweets`;

      if (pathname === MEDIA_PAGE_ROUTE) return `0 Photos & videos`;

      if (pathname === LIKES_PAGE_ROUTE) return `${likesCount} Likes`;
    }

    return "";
  }, [userData, pathname, tweetCount, likesCount]);

  return (
    <TopBar
      loading={isLoading}
      startIcon={
        <IconButton title="Back" onClick={() => back()} color="white">
          <BackIcon />
        </IconButton>
      }
    >
      <TopBarHeading heading={userData ? userData.name : "Profile"} subheading={topBarSubheading} />
    </TopBar>
  );
};
