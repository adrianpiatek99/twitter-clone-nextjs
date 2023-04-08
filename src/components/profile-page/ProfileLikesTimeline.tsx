import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import { TweetCell, TweetCellSkeletons } from "shared/TweetCell";
import type { LikedTweetData } from "types/tweet";
import type { UserData } from "types/user";
import { api } from "utils/api";

interface ProfileLikesTimelineProps {
  userData: UserData;
}

export const ProfileLikesTimeline = ({ userData: { screenName } }: ProfileLikesTimelineProps) => {
  const likesInfiniteQuery = api.tweet.likesTimeline.useInfiniteQuery(
    { profileScreenName: screenName },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false,
      refetchOnWindowFocus: false
    }
  );
  const { data, error } = likesInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["likedTweets"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...likesInfiniteQuery}
      data={flatData}
      ariaLabel={`Timeline: ${screenName}’s Likes`}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of likes"
      loaderComponent={<TweetCellSkeletons />}
      itemComponent={({ index }) => {
        const like = flatData[index] as LikedTweetData;

        return <TweetCell tweetData={like.tweet} />;
      }}
    />
  );
};
