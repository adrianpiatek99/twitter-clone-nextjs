import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import { TweetCell, TweetCellSkeletons } from "shared/TweetCell";
import type { TweetData } from "types/tweet";
import type { UserData } from "types/user";
import { api } from "utils/api";

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
  const { data, error } = profileTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...profileTimelineInfiniteQuery}
      data={flatData}
      ariaLabel={`Timeline: ${screenName}’s Tweets`}
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
