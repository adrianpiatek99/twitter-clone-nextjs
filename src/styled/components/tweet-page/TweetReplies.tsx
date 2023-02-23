import React from "react";

import { Loader } from "components/core";
import { useInfiniteScrollHelpers } from "hooks/useInfiniteScrollHelpers";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import { TweetReplyCell, TweetReplyCellSkeleton } from "shared/TweetReplyCell";
import styled from "styled-components";
import type { ReplyData } from "types/tweetReply";
import { api } from "utils/api";

interface TweetRepliesProps {
  queryTweetId: string;
}

export const TweetReplies = ({ queryTweetId }: TweetRepliesProps) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } =
    api.tweetReply.replies.useInfiniteQuery(
      { tweetId: queryTweetId },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false,
        refetchOnWindowFocus: false
      }
    );
  const { lastItemRef } = useInfiniteScrollHelpers({ isFetching, hasNextPage, fetchNextPage });
  const flatData = data?.pages.flatMap(page => page["replies"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 600);
  const skeletons = Array(7)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  if (!isLoading && flatData.length === 0) {
    return <EmptyMessage text="Lack of replies" />;
  }

  return (
    <RepliesSection>
      {isLoading ? (
        skeletons.map(skeleton => <TweetReplyCellSkeleton key={skeleton} />)
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

      {isFetching && !isLoading && (
        <LoaderWrapper additionalPadding>
          <Loader center />
        </LoaderWrapper>
      )}
      {hasNextPage && !isLoading && <LoadMoreItems ref={lastItemRef} />}
    </RepliesSection>
  );
};

const RepliesSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
`;

const LoaderWrapper = styled.div<{ additionalPadding?: boolean }>`
  margin: 30px 0;
  padding-bottom: ${({ additionalPadding }) => additionalPadding && "40px"};
`;

const LoadMoreItems = styled.div`
  position: absolute;
  bottom: 0px;
  height: 95vh;
  left: 0px;
  pointer-events: none;
`;
