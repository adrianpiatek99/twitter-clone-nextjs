import type { QueryClient } from "@tanstack/react-query";
import type {
  TweetData,
  TweetProfileTimelineInputs,
  TweetProfileTimelineOutputs,
  TweetTimelineInputs,
  TweetTimelineOutputs
} from "types/tweet";

import { queryKeys } from "./queryKeys";

type AddTweetCacheInput = TweetTimelineInputs & TweetProfileTimelineInputs;

type AddTweetCacheProps<TInput> = {
  queryClient: QueryClient;
  newTweet: TweetData;
  input: TInput;
};

export const addTweetCache = ({ ...props }: AddTweetCacheProps<AddTweetCacheInput>) => {
  addTweetToHomeTimelineCache(props);
  addTweetToProfileTimelineCache(props);
};

const addTweetToHomeTimelineCache = ({
  queryClient,
  newTweet
}: AddTweetCacheProps<TweetTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(
    queryKeys.tweetTimelineQueryKey(),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map((page, index) =>
        index === 0
          ? {
              ...page,
              tweets: [newTweet, ...page.tweets]
            }
          : page
      );

      return {
        ...oldData,
        pages
      };
    }
  );
};

const addTweetToProfileTimelineCache = ({
  queryClient,
  newTweet,
  input
}: AddTweetCacheProps<TweetProfileTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetProfileTimelineOutputs[] }>(
    queryKeys.tweetProfileTimelineQueryKey(input),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map((page, index) =>
        index === 0
          ? {
              ...page,
              tweets: [newTweet, ...page.tweets]
            }
          : page
      );

      return {
        ...oldData,
        pages
      };
    }
  );
};
