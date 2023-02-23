import { useState } from "react";

import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "types/react-query";
import type { TweetTimelineOutputs } from "types/tweet";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";
import { uniqBy } from "utils/uniqBy";

const handleGetQueryTweetsByKey = (queryClient: QueryClient, queryKey: QueryKey<unknown>) =>
  queryClient
    .getQueryData<{ pages: TweetTimelineOutputs[] }>(queryKey)
    ?.pages.flatMap(page => page.tweets) ?? [];

const handleGetTweetDetailsFromCache = (
  queryClient: QueryClient,
  tweetId: string,
  screenName: string
) => {
  const homeTimelineTweets = handleGetQueryTweetsByKey(
    queryClient,
    queryKeys.tweetTimelineQueryKey()
  );
  const userTimelineTweets = handleGetQueryTweetsByKey(
    queryClient,
    queryKeys.tweetProfileTimelineQueryKey({ profileScreenName: screenName })
  );

  const tweets = uniqBy([...homeTimelineTweets, ...userTimelineTweets], "id");

  return tweets.find(({ id }) => id === tweetId) ?? undefined;
};

interface UseTweetDetailsQueryProps {
  tweetId: string;
  screenName: string;
}

export const useTweetDetailsQuery = ({ tweetId, screenName }: UseTweetDetailsQueryProps) => {
  const queryClient = useQueryClient();
  const cachedTweet = handleGetTweetDetailsFromCache(queryClient, tweetId, screenName);
  const [isQueryError, setIsQueryError] = useState(false);
  const tweetDetailsQuery = api.tweet.details.useQuery(
    { tweetId, screenName },
    {
      onError: () => {
        setIsQueryError(true);
      },
      retry: false,
      refetchOnWindowFocus: !isQueryError,
      initialData: cachedTweet
    }
  );

  return {
    ...tweetDetailsQuery,
    isLoading: tweetDetailsQuery.isLoading
  };
};
