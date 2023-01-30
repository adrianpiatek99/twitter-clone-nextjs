import React from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import type { UserTweetsRequest, UserTweetsResponse } from "api/tweet/userTweets";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { userTweets } from "network/tweet/userTweets";
import type { ProfilePageProps } from "pages/[screenName]";
import { ErrorMessage } from "shared/ErrorMessage";
import { TweetCard, TweetCardSkeleton } from "shared/TweetCard";
import styled from "styled-components";

export const ProfilePageTemplate = ({ userData: { id: userId, screenName } }: ProfilePageProps) => {
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<UserTweetsRequest, UserTweetsResponse, TweetData>({
      queryKey: ["tweets", screenName],
      queryFn: userTweets,
      params: {
        userId
      }
    });
  const { items, measureElement, totalSize } = useVirtualScroll(data, 600);
  const skeletons = Array(3)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage message={error?.message} />;
  }

  return (
    <TweetsSection>
      {isLoading ? (
        skeletons.map(skeleton => <TweetCardSkeleton key={skeleton} isEven={skeleton % 2 === 0} />)
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
              <TweetCard
                key={tweet.id}
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
