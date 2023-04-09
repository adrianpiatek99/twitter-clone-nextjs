import React from "react";

import { InfiniteVirtualScroller } from "shared/InfiniteVirtualScroller";
import { TweetReplyCell, TweetReplyCellSkeletons } from "shared/TweetReplyCell";
import type { ReplyData } from "types/tweetReply";
import { api } from "utils/api";

interface TweetRepliesProps {
  tweetId: string;
}

export const TweetReplies = ({ tweetId }: TweetRepliesProps) => {
  const tweetRepliesInfiniteQuery = api.tweetReply.replies.useInfiniteQuery(
    { tweetId },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false,
      refetchOnWindowFocus: false
    }
  );
  const { data, error } = tweetRepliesInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["replies"]) ?? [];

  return (
    <InfiniteVirtualScroller
      {...tweetRepliesInfiniteQuery}
      data={flatData}
      errorMessage={error?.message ?? ""}
      emptyMessage="Lack of replies"
      loaderComponent={<TweetReplyCellSkeletons />}
      itemComponent={({ index }) => {
        const reply = flatData[index] as ReplyData;

        return <TweetReplyCell replyData={reply} />;
      }}
    />
  );
};
