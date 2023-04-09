import type { QueryClient } from "@tanstack/react-query";
import type {
  TweetData,
  TweetDetailsInputs,
  TweetLikesTimelineInputs,
  TweetLikesTimelineOutputs,
  TweetProfileTimelineInputs,
  TweetProfileTimelineOutputs,
  TweetTimelineInputs,
  TweetTimelineOutputs
} from "types/tweet";

import { queryKeys } from "./queryKeys";

export type UpdateTweenFnc = (data: TweetData) => TweetData;

type UpdateTweetsCacheInput = TweetTimelineInputs &
  TweetProfileTimelineInputs &
  TweetLikesTimelineInputs &
  TweetDetailsInputs;

type UpdateTimelineCacheProps<TInput> = {
  queryClient: QueryClient;
  tweetId: string;
  input: TInput;
  updateTweet: UpdateTweenFnc;
};

export const updateTweetsCache = ({
  ...props
}: UpdateTimelineCacheProps<UpdateTweetsCacheInput>) => {
  updateHomeTimelineCache(props);
  updateProfileTimelineCache(props);
  updateLikesTimelineCache(props);

  updateTweetDetailsCache(props);
};

const updateHomeTimelineCache = ({
  queryClient,
  tweetId,
  updateTweet
}: UpdateTimelineCacheProps<TweetTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(
    queryKeys.tweetTimelineQueryKey(),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        tweets: page.tweets.map(tweet => {
          if (tweet.id === tweetId) {
            return updateTweet(tweet);
          }

          return tweet;
        })
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const updateProfileTimelineCache = ({
  queryClient,
  tweetId,
  input,
  updateTweet
}: UpdateTimelineCacheProps<TweetProfileTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetProfileTimelineOutputs[] }>(
    queryKeys.tweetProfileTimelineQueryKey({ ...input }),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        tweets: page.tweets.map(tweet => {
          if (tweet.id === tweetId) {
            return updateTweet(tweet);
          }

          return tweet;
        })
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const updateLikesTimelineCache = ({
  queryClient,
  tweetId,
  input,
  updateTweet
}: UpdateTimelineCacheProps<TweetLikesTimelineInputs>) => {
  queryClient.setQueryData<{ pages: TweetLikesTimelineOutputs[] }>(
    queryKeys.tweetLikesTimelineQueryKey({ ...input }),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        likedTweets: page.likedTweets.map(like => {
          const { tweet } = like;

          if (tweet.id === tweetId) {
            return { ...like, tweet: updateTweet(tweet) };
          }

          return like;
        })
      }));

      return {
        ...oldData,
        pages
      };
    }
  );
};

const updateTweetDetailsCache = ({
  queryClient,
  input,
  updateTweet
}: UpdateTimelineCacheProps<TweetDetailsInputs>) => {
  queryClient.setQueryData<TweetData>(queryKeys.tweetDetailsQueryKey(input), oldData => {
    if (!oldData) return oldData;

    return updateTweet(oldData);
  });
};
