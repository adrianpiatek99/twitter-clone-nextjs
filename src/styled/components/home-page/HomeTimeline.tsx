import React from "react";

import { Loader } from "components/core";
import { useInfiniteScrollHelpers } from "hooks/useInfiniteScrollHelpers";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { ErrorMessage } from "shared/Messages";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import styled from "styled-components";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";

export const HomeTimeline = () => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } =
    api.tweet.timeline.useInfiniteQuery(
      {},
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false
      }
    );
  const { lastItemRef } = useInfiniteScrollHelpers({ isFetching, hasNextPage, fetchNextPage });
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 50);
  const skeletons = Array(3)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  return (
    <TweetsSection aria-label="Timeline: Your Home Timeline">
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
            const tweet = flatData[index] as TweetData;

            return (
              <TweetCell
                key={index}
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
