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
import { TweetCard } from "shared/TweetCard";
import styled from "styled-components";

export const HomeTimeline = () => {
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<TimelineTweetsRequest, TimelineTweetsResponse, TweetData>({
      queryKey: ["tweets"],
      queryFn: timelineTweets
    });
  const { items, measureElement, outerWrapperStyle, getItemStyle } = useVirtualScroll(data, 50);

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <TweetsSection>
      {isLoading ? (
        <LoaderWrapper>
          <Loader center />
        </LoaderWrapper>
      ) : (
        <div style={outerWrapperStyle}>
          {items.map(virtualRow => {
            const { index, start } = virtualRow;
            const tweet = data[index] as TweetData;

            return (
              <TweetCard
                key={tweet.id}
                data-index={index}
                ref={measureElement}
                tweetData={tweet}
                style={getItemStyle(start)}
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
