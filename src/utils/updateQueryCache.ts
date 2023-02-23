import type { QueryClient } from "@tanstack/react-query";
import type { QueryKey } from "types/react-query";
import type {
  TweetData,
  TweetDetailsInputs,
  TweetLikesTimelineInputs,
  TweetLikesTimelineOutputs,
  TweetProfileTimelineInputs,
  TweetTimelineOutputs
} from "types/tweet";
import type { ReplyData, TweetRepliesInputs, TweetRepliesOutputs } from "types/tweetReply";

import { queryKeys } from "./queryKeys";

export const addTweetInfiniteCache = (
  queryClient: QueryClient,
  newTweet: TweetData,
  queryKey: QueryKey<unknown>
) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(queryKey, oldData => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page, index) =>
        index === 0
          ? {
              ...page,
              tweets: [newTweet, ...page.tweets]
            }
          : page
      )
    };
  });
};

export const removeTweetInfiniteCache = (
  queryClient: QueryClient,
  tweetId: string,
  queryKey: QueryKey<unknown>
) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(queryKey, oldData => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map(page => ({
        ...page,
        tweets: page.tweets.filter(tweet => tweet.id !== tweetId)
      }))
    };
  });
};

const updateTweetInfiniteCacheTemplate = (
  queryClient: QueryClient,
  tweetId: string,
  queryKey: QueryKey<unknown>,
  updateTweet: (data: TweetData) => TweetData
) => {
  queryClient.setQueryData<{ pages: TweetTimelineOutputs[] }>(queryKey, oldData => {
    if (!oldData) return oldData;

    const newData = oldData.pages.map(page => {
      const tweets = page.tweets.map(tweet => {
        if (tweet.id === tweetId) {
          return updateTweet(tweet);
        }

        return tweet;
      });

      return { ...page, tweets };
    });

    return { ...oldData, pages: newData };
  });
};

export const updateTweetInfiniteCache = (
  queryClient: QueryClient,
  tweetId: string,
  updateTweet: (data: TweetData) => TweetData
) =>
  updateTweetInfiniteCacheTemplate(
    queryClient,
    tweetId,
    queryKeys.tweetTimelineQueryKey(),
    updateTweet
  );

export const updateProfileTweetInfiniteCache = (
  queryClient: QueryClient,
  tweetId: string,
  input: TweetProfileTimelineInputs,
  updateTweet: (data: TweetData) => TweetData
) =>
  updateTweetInfiniteCacheTemplate(
    queryClient,
    tweetId,
    queryKeys.tweetProfileTimelineQueryKey({ ...input }),
    updateTweet
  );

export const addReplyInfiniteCache = (
  queryClient: QueryClient,
  newReply: ReplyData,
  queryKey: QueryKey<TweetRepliesInputs>
) => {
  queryClient.setQueryData<{ pages: TweetRepliesOutputs[] }>(queryKey, oldData => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page, index) =>
        index === 0
          ? {
              ...page,
              replies: [newReply, ...page.replies]
            }
          : page
      )
    };
  });
};

export const updateTweetDetailsCache = (
  queryClient: QueryClient,
  queryKey: QueryKey<TweetDetailsInputs>,
  updateTweet: (data: TweetData) => TweetData
) => {
  queryClient.setQueryData<TweetData>(queryKey, oldData => {
    if (!oldData) return oldData;

    return updateTweet(oldData);
  });
};

export const updateLikesTweetInfiniteCache = (
  queryClient: QueryClient,
  tweetId: string,
  input: TweetLikesTimelineInputs,
  updateTweet: (data: TweetData) => TweetData
) => {
  queryClient.setQueryData<{ pages: TweetLikesTimelineOutputs[] }>(
    queryKeys.tweetLikesTimelineQueryKey({ ...input }),
    oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map(page => {
          return {
            ...page,
            likedTweets: page.likedTweets.map(like => {
              const { tweet } = like;

              if (tweet.id === tweetId) {
                return { ...like, tweet: updateTweet(tweet) };
              }

              return like;
            })
          };
        })
      };
    }
  );
};
