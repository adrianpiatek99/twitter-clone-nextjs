import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import { TweetCell, TweetCellSkeletons } from "shared/TweetCell";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";

export const HomeTimeline = () => {
  const homeTimelineInfiniteQuery = api.tweet.timeline.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false
    }
  );
  const { data, error } = homeTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...homeTimelineInfiniteQuery}
      data={flatData}
      ariaLabel="Timeline: Your Home Timeline"
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of tweets"
      loaderComponent={<TweetCellSkeletons />}
      itemComponent={({ index }) => {
        const tweet = flatData[index] as TweetData;

        return <TweetCell tweetData={tweet} />;
      }}
    />
  );
};
