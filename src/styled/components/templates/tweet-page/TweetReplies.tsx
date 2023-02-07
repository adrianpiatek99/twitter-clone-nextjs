import React from "react";

import type { RepliesTweetRequest, RepliesTweetResponse } from "api/tweet/repliesTweet";
import type { ReplyData } from "api/tweet/replyTweet";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { repliesTweet } from "network/tweet/repliesTweet";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import styled from "styled-components";

import { TweetReplyCell, TweetReplyCellSkeleton } from "../../shared/TweetReplyCell";

interface TweetRepliesProps {
  queryTweetId: string;
}

export const TweetReplies = ({ queryTweetId }: TweetRepliesProps) => {
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<RepliesTweetRequest, RepliesTweetResponse, ReplyData>({
      queryKey: ["replies", "tweet", queryTweetId],
      queryFn: repliesTweet,
      params: {
        tweetId: queryTweetId
      }
    });
  const { items, measureElement, totalSize } = useVirtualScroll(data, 600);
  const skeletons = Array(7)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  if (!isLoading && data.length === 0) {
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
            const reply = data[index] as ReplyData;

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
