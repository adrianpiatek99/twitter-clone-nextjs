import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import type { FollowUserData, UserData } from "types/user";
import { api } from "utils/api";

import { FollowCell, FollowCellSkeletons } from "./FollowCell";

type ProfileFollowingTimelineProps = {
  userData: UserData;
};

export const ProfileFollowingTimeline = ({
  userData: { screenName }
}: ProfileFollowingTimelineProps) => {
  const profileFollowingTimelineInfiniteQuery = api.user.following.useInfiniteQuery(
    { screenName },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false
    }
  );
  const { data, error } = profileFollowingTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["following"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...profileFollowingTimelineInfiniteQuery}
      data={flatData}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of followed people"
      loaderComponent={<FollowCellSkeletons />}
      itemComponent={({ index }) => {
        const follow = flatData[index]?.following as FollowUserData;

        return <FollowCell followUser={follow} />;
      }}
    />
  );
};
