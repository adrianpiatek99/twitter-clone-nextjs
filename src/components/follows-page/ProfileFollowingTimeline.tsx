import React from "react";

import { useVirtualScroll } from "hooks/useVirtualScroll";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import type { FollowUserData, UserData } from "types/user";
import { api } from "utils/api";
import { createArray } from "utils/array";

import { FollowCell, FollowCellSkeleton } from "./FollowCell";

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
  const { data, isLoading, error } = profileFollowingTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["following"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 100);

  return (
    <InfiniteScrollingSection
      {...profileFollowingTimelineInfiniteQuery}
      flatDataCount={flatData.length}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of followed people"
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
            const follow = flatData[index]?.following as FollowUserData;

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
