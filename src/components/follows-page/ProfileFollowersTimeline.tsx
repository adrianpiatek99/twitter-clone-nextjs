import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import type { FollowUserData, UserData } from "types/user";
import { api } from "utils/api";

import { FollowCell, FollowCellSkeletons } from "./FollowCell";

type ProfileFollowersTimelineProps = {
  userData: UserData;
};

export const ProfileFollowersTimeline = ({
  userData: { screenName }
}: ProfileFollowersTimelineProps) => {
  const profileFollowersTimelineInfiniteQuery = api.user.followers.useInfiniteQuery(
    { screenName },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false
    }
  );
  const { data, error } = profileFollowersTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["followers"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...profileFollowersTimelineInfiniteQuery}
      data={flatData}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of followers"
      loaderComponent={<FollowCellSkeletons />}
      itemComponent={({ index }) => {
        const follow = flatData[index]?.follower as FollowUserData;

        return <FollowCell followUser={follow} />;
      }}
    />
  );
};
