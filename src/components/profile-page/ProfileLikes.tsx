import React, { useRef } from "react";

import { useVirtualScroll } from "hooks/useVirtualScroll";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import type { LikedTweetData } from "types/tweet";
import type { UserData } from "types/user";
import { api } from "utils/api";
import { createArray } from "utils/array";

interface ProfileLikesProps {
  userData: UserData;
}

export const ProfileLikes = ({ userData: { id: profileId, screenName } }: ProfileLikesProps) => {
  const profileLikesInfiniteQuery = api.tweet.likesTimeline.useInfiniteQuery(
    { profileId },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false,
      refetchOnWindowFocus: false
    }
  );
  const { data, isLoading, error } = profileLikesInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["likedTweets"]) ?? [];
  const parentRef = useRef<HTMLDivElement>(null);
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, parentRef);

  return (
    <InfiniteScrollingSection
      {...profileLikesInfiniteQuery}
      ref={parentRef}
      flatDataCount={flatData.length}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of likes"
      ariaLabel={`Timeline: ${screenName}’s Likes`}
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
            const like = flatData[index] as LikedTweetData;

            return (
              <TweetCell
                key={index}
                data-index={index}
                ref={measureElement}
                start={start}
                tweetData={like.tweet}
              />
            );
          })}
        </div>
      )}
    </InfiniteScrollingSection>
  );
};
