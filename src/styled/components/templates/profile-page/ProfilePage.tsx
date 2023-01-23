import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { TweetData } from "api/tweet/timelineTweets";
import { UserTweetsRequest, UserTweetsResponse } from "api/tweet/userTweets";
import { Loader } from "components/core";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { userTweets } from "network/tweet/userTweets";
import { ProfilePageProps } from "pages/[screenName]";
import { TweetCard } from "shared/TweetCard";
import styled from "styled-components";

export const ProfilePageTemplate = ({ userData: { id: userId } }: ProfilePageProps) => {
  const queryClient = useQueryClient();
  const [tweetSectionRef] = useAutoAnimate<HTMLTableSectionElement>({
    duration: 250
  });
  const { data, isLoading, isFetching, lastItemRef, hasNextPage } = useInfiniteScrollQuery<
    UserTweetsRequest,
    UserTweetsResponse,
    TweetData
  >({
    queryKey: ["tweets", "user", userId],
    queryFn: userTweets,
    params: {
      userId
    }
  });

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
