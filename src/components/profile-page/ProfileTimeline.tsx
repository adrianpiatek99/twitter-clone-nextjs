import React from "react";

import { useVirtualScroll } from "hooks/useVirtualScroll";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import type { TweetData } from "types/tweet";
import type { UserData } from "types/user";
import { api } from "utils/api";
import { createArray } from "utils/array";

interface ProfileTimelineProps {
  userData: UserData;
}

export const ProfileTimeline = ({ userData: { screenName } }: ProfileTimelineProps) => {
  const profileTimelineInfiniteQuery = api.tweet.profileTimeline.useInfiniteQuery(
    { profileScreenName: screenName },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false
    }
  );
  const { data, isLoading, error } = profileTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 600);

  return (
    <InfiniteScrollingSection
      {...profileTimelineInfiniteQuery}
      flatDataCount={flatData.length}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of tweets"
      ariaLabel={`Timeline: ${screenName}’s Tweets`}
    >
      {isLoading ? (
        createArray(3).map(skeleton => (
          <TweetCellSkeleton key={skeleton} isEven={skeleton % 2 === 0} />
        ))
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const tweet = flatData[index] as TweetData;

            return (
              <TweetCell
                key={index}
                data-index={index}
                ref={measureElement}
                start={start}
                tweetData={tweet}
              />
            );
          })}
        </div>
      )}
    </InfiniteScrollingSection>
  );
};
