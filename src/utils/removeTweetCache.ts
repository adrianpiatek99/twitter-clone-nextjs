import type { QueryClient } from "@tanstack/react-query";
import type {
  TweetDetailsInputs,
  TweetLikesTimelineInputs,
  TweetLikesTimelineOutputs,
  TweetProfileTimelineInputs,
  TweetProfileTimelineOutputs,
  TweetTimelineInputs,
  TweetTimelineOutputs
} from "types/tweet";

import { queryKeys } from "./queryKeys";

type RemoveTweetCacheInput = TweetTimelineInputs &
  TweetProfileTimelineInputs &
  TweetLikesTimelineInputs &
  TweetDetailsInputs;

type RemoveTweetCacheProps<TInput> = {
  queryClient: QueryClient;
  tweetId: string;
  input: TInput;
};

export const removeTweetCache = ({ ...props }: RemoveTweetCacheProps<RemoveTweetCacheInput>) => {
  removeTweetFromHomeTimelineCache(props);
  removeTweetFromProfileTimelineCache(props);
  removeTweetFromLikesTimelineCache(props);

  removeTweetDetailsCache(props);
};

const removeTweetFromHomeTimelineCache = ({
  queryClient,
  tweetId
}: RemoveTweetCacheProps<TweetTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(
    queryKeys.tweetTimelineQueryKey(),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        tweets: page.tweets.filter(tweet => tweet.id !== tweetId)
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const removeTweetFromProfileTimelineCache = ({
  queryClient,
  tweetId,
  input
}: RemoveTweetCacheProps<TweetProfileTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetProfileTimelineOutputs[] }>(
    queryKeys.tweetProfileTimelineQueryKey(input),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        tweets: page.tweets.filter(tweet => tweet.id !== tweetId)
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const removeTweetFromLikesTimelineCache = ({
  queryClient,
  tweetId,
  input
}: RemoveTweetCacheProps<TweetLikesTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetLikesTimelineOutputs[] }>(
    queryKeys.tweetLikesTimelineQueryKey(input),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        likedTweets: page.likedTweets.filter(({ tweet }) => tweet.id !== tweetId)
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const removeTweetDetailsCache = ({
  queryClient,
  input
}: RemoveTweetCacheProps<TweetDetailsInputs>) => {
  queryClient.removeQueries(queryKeys.tweetDetailsQueryKey(input));
};
