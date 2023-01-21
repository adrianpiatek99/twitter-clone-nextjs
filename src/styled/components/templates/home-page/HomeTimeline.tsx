import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { TimelineTweetsRequest, TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import { Loader } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { homeGlobalTimeline } from "network/tweet/timelineTweets";
import { TweetCard } from "shared/TweetCard";
import styled from "styled-components";

export const HomeTimeline = () => {
  const { session } = useAppSession();
  const [tweetSectionRef] = useAutoAnimate<HTMLTableSectionElement>({
    duration: 250
  });
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<TimelineTweetsRequest, TimelineTweetsResponse, TweetData>({
      queryKey: ["tweets"],
      queryFn: homeGlobalTimeline
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
        data.map(tweet => (
          <TweetCard
            key={tweet.id}
            queryClient={queryClient}
            userId={session?.user.id}
            {...tweet}
          />
        ))
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
