import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import type {
  TimelineTweetsRequest,
  TimelineTweetsResponse,
  TweetData
} from "api/tweet/timelineTweets";
import { Loader } from "components/core";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { timelineTweets } from "network/tweet/timelineTweets";
import { TweetCard } from "shared/TweetCard";
import styled from "styled-components";

export const HomeTimeline = () => {
  const [tweetSectionRef] = useAutoAnimate<HTMLTableSectionElement>();
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<TimelineTweetsRequest, TimelineTweetsResponse, TweetData>({
      queryKey: ["tweets"],
      queryFn: timelineTweets
    });

  if (isError) {
    return <div>{JSON.stringify((error as any)?.message)}</div>;
  }

  return (
    <TweetsSection ref={tweetSectionRef}>
      {isLoading ? (
        <LoaderWrapper>
          <Loader center />
        </LoaderWrapper>
      ) : (
        data.map(tweet => <TweetCard key={tweet.id} queryClient={queryClient} {...tweet} />)
      )}
      {isFetching && !isLoading && (
        <LoaderWrapper additionalPadding>
          <Loader center />
        </LoaderWrapper>
      )}
      {hasNextPage && <div ref={lastItemRef} />}
    </TweetsSection>
  );
};

const TweetsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 150px;
`;

const LoaderWrapper = styled.div<{ additionalPadding?: boolean }>`
  margin: 30px 0;
  padding-bottom: ${({ additionalPadding }) => additionalPadding && "40px"};
`;
