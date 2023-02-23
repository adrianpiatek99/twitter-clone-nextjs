import React from "react";

import { Loader } from "components/core";
import { useInfiniteScrollHelpers } from "hooks/useInfiniteScrollHelpers";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import styled from "styled-components";
import type { TweetData } from "types/tweet";
import type { UserData } from "types/user";
import { api } from "utils/api";

interface ProfileTimelineProps {
  userData: UserData;
}

export const ProfileTimeline = ({ userData: { screenName } }: ProfileTimelineProps) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } =
    api.tweet.profileTimeline.useInfiniteQuery(
      { profileScreenName: screenName },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false
      }
    );
  const { lastItemRef } = useInfiniteScrollHelpers({ isFetching, hasNextPage, fetchNextPage });
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 600);
  const skeletons = Array(3)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  if (!isLoading && flatData.length === 0) {
    return <EmptyMessage text="Lack of tweets" />;
  }

  return (
    <TweetsSection aria-label={`Timeline: ${screenName}’s Tweets`}>
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
                data-index={index}
                ref={measureElement}
                start={start}
                tweetData={tweet}
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
