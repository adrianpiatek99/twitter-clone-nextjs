import React from "react";

import { useVirtualScroll } from "hooks/useVirtualScroll";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import type { FollowUserData, UserData } from "types/user";
import { api } from "utils/api";
import { createArray } from "utils/array";

import { FollowCell, FollowCellSkeleton } from "./FollowCell";

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
  const { data, isLoading, error } = profileFollowersTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["followers"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 100);

  return (
    <InfiniteScrollingSection
      {...profileFollowersTimelineInfiniteQuery}
      flatDataCount={flatData.length}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of followers"
    >
      {isLoading ? (
        createArray(7).map(skeleton => <FollowCellSkeleton key={skeleton} />)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const follow = flatData[index]?.follower as FollowUserData;

            return (
              <FollowCell
                key={follow.id}
                data-index={index}
                ref={measureElement}
                start={start}
                followUser={follow}
              />
            );
          })}
        </div>
      )}
    </InfiniteScrollingSection>
  );
};
