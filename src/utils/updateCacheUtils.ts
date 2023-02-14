import type { QueryClient } from "@tanstack/react-query";
import type { TimelineTweetsResponse } from "api/tweet/timelineTweets";
import type { TweetData } from "api/tweet/timelineTweets";

export const updateInfiniteTweetsCache = (
  queryClient: QueryClient,
  additionalQueryKey: string[],
  tweetId: string,
  updateData: (data: TweetData) => TweetData
) => {
  queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(
    ["tweets", ...additionalQueryKey, "infinite"],
    oldData => {
      if (!oldData) return oldData;

      const newData = oldData.pages.map(page => {
        const tweets = page.tweets.map(tweet => {
          if (tweet.id === tweetId) {
            return updateData(tweet);
          }

          return tweet;
        });

        return { ...page, tweets };
      });

      return { ...oldData, pages: newData };
    }
  );
};

export const updateTweetCache = (
  queryClient: QueryClient,
  additionalQueryKey: string[],
  updateData: (data: TweetData) => TweetData
) => {
  queryClient.setQueryData<TweetData>(["tweet", ...additionalQueryKey], oldData => {
    if (!oldData) return oldData;

    return updateData(oldData);
  });
};
