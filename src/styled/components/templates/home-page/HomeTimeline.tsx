import React from "react";

import type {
  TimelineTweetsRequest,
  TimelineTweetsResponse,
  TweetData
} from "api/tweet/timelineTweets";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { timelineTweets } from "network/tweet/timelineTweets";
import { ErrorMessage } from "shared/ErrorMessage";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import styled from "styled-components";

export const HomeTimeline = () => {
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<TimelineTweetsRequest, TimelineTweetsResponse, TweetData>({
      queryKey: ["tweets"],
      queryFn: timelineTweets
    });
  const { items, measureElement, totalSize } = useVirtualScroll(data, 50);
  const skeletons = Array(3)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <TweetsSection>
      {isLoading ? (
        skeletons.map(skeleton => <TweetCellSkeleton key={skeleton} isEven={skeleton % 2 === 0} />)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const tweet = data[index] as TweetData;

            return (
              <TweetCell
                key={tweet.id}
                ref={measureElement}
                data-index={index}
                tweetData={tweet}
                start={start}
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
    </TweetsSection>
  );
};

const TweetsSection = styled.section`
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
