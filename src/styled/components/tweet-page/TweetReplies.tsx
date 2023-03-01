import React from "react";

import { useVirtualScroll } from "hooks/useVirtualScroll";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import { TweetReplyCell, TweetReplyCellSkeleton } from "shared/TweetReplyCell";
import type { ReplyData } from "types/tweetReply";
import { api } from "utils/api";
import { createArray } from "utils/array";

interface TweetRepliesProps {
  queryTweetId: string;
}

export const TweetReplies = ({ queryTweetId }: TweetRepliesProps) => {
  const tweetRepliesInfiniteQuery = api.tweetReply.replies.useInfiniteQuery(
    { tweetId: queryTweetId },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false,
      refetchOnWindowFocus: false
    }
  );
  const { data, isLoading, error } = tweetRepliesInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["replies"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 600);

  return (
    <InfiniteScrollingSection
      {...tweetRepliesInfiniteQuery}
      flatDataCount={flatData.length}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of replies"
    >
      {isLoading ? (
        createArray(7).map(skeleton => <TweetReplyCellSkeleton key={skeleton} />)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const reply = flatData[index] as ReplyData;

            return (
              <TweetReplyCell
                key={index}
                data-index={index}
                ref={measureElement}
                start={start}
                replyData={reply}
              />
            );
          })}
        </div>
      )}
    </InfiniteScrollingSection>
  );
};
