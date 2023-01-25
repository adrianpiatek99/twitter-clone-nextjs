import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { TweetData } from "api/tweet/timelineTweets";
import type { UserTweetsRequest, UserTweetsResponse } from "api/tweet/userTweets";
import { Loader } from "components/core";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { userTweets } from "network/tweet/userTweets";
import type { ProfilePageProps } from "pages/[screenName]";
import { ErrorMessage } from "shared/ErrorMessage";
import { TweetCard } from "shared/TweetCard";
import styled from "styled-components";

export const ProfilePageTemplate = ({ userData: { id: userId } }: ProfilePageProps) => {
  const queryClient = useQueryClient();
  const [tweetSectionRef] = useAutoAnimate<HTMLTableSectionElement>();
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<UserTweetsRequest, UserTweetsResponse, TweetData>({
      queryKey: ["tweets", "user", userId],
      queryFn: userTweets,
      params: {
        userId
      }
    });

  if (isError) {
    return <ErrorMessage message={error?.message} />;
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
  overflow: hidden;
`;

const LoaderWrapper = styled.div<{ additionalPadding?: boolean }>`
  margin: 30px 0;
  padding-bottom: ${({ additionalPadding }) => additionalPadding && "40px"};
`;
