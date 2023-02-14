import React from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import type { UserTweetsRequest, UserTweetsResponse } from "api/tweet/userTweets";
import type { UserData } from "api/user/userByScreenName";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { userTweets } from "network/tweet/userTweets";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import styled from "styled-components";

interface ProfileTimelineProps {
  userData: UserData;
}

export const ProfileTimeline = ({ userData: { id: userId, screenName } }: ProfileTimelineProps) => {
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
    return <ErrorMessage title={error.message} />;
  }

  if (!isLoading && data.length === 0) {
    return <EmptyMessage text="Lack of tweets" />;
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
