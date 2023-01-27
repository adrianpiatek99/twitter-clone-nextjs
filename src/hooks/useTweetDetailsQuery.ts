import { useState } from "react";

import { type QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { uniqBy } from "lodash";
import { tweetDetails } from "network/tweet/tweetDetails";

const handleGetQueryTweetsByKey = (queryClient: QueryClient, queryKey: string[]) =>
  queryClient
    .getQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey)
    ?.pages.flatMap(page => page.tweets) ?? [];

const handleGetTweetDetailsFromCache = (
  queryClient: QueryClient,
  tweetId: string,
  screenName: string
) => {
  const homeTimelineTweets = handleGetQueryTweetsByKey(queryClient, ["tweets", "infinite"]);
  const userTimelineTweets = handleGetQueryTweetsByKey(queryClient, [
    "tweets",
    screenName,
    "infinite"
  ]);

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
  const tweetDetailsQuery = useQuery<TweetData, AxiosError>({
    queryKey: ["tweets", tweetId],
    queryFn: () => tweetDetails({ screenName, tweetId }),
    onError: () => {
      setIsQueryError(true);
    },
    enabled: !cachedTweet,
    retry: false,
    refetchOnWindowFocus: !isQueryError
  });

  return {
    cachedTweet,
    ...tweetDetailsQuery,
    isLoading: tweetDetailsQuery.isLoading && !cachedTweet
  };
};
