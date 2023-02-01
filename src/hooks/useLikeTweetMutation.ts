import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LikeTweetRequest } from "api/tweet/likeTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { likeTweet } from "network/tweet/likeTweet";
import { unlikeTweet } from "network/tweet/unlikeTweet";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

type Action = "like" | "unlike";

interface UseLikeTweetMutationProps {
  tweetData: TweetData;
  disabled?: boolean;
}

export const useLikeTweetMutation = ({
  tweetData: {
    id: tweetId,
    likes,
    author: { screenName }
  },
  disabled = false
}: UseLikeTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const currentUserId = session?.user.id ?? "";
  const isLiked = likes.some(({ userId }) => userId === currentUserId);

  const { mutate: likeMutate, isLoading: likeLoading } = useMutation<
    unknown,
    AxiosError,
    LikeTweetRequest
  >({
    mutationFn: likeTweet,
    onSuccess: () => {
      updateTweetsCache("like", ["tweets", "infinite"]);
      updateTweetsCache("like", ["tweets", screenName, "infinite"]);
      updateTweetCache("like", ["tweet", screenName, tweetId]);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });
  const { mutate: unlikeMutate, isLoading: unlikeLoading } = useMutation<
    unknown,
    AxiosError,
    LikeTweetRequest
  >({
    mutationFn: unlikeTweet,
    onSuccess: () => {
      updateTweetsCache("unlike", ["tweets", "infinite"]);
      updateTweetsCache("unlike", ["tweets", screenName, "infinite"]);
      updateTweetCache("unlike", ["tweet", screenName, tweetId]);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateTweetsCache = (action: Action, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const count = action === "like" ? 1 : -1;
        const likesArray = action === "like" ? [{ userId: currentUserId }] : [];

        const newTweets = oldData.pages.map(page => {
          const tweets = page.tweets.map(tweet => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                likes: likesArray,
                _count: { likes: tweet._count.likes + count }
              };
            }

            return tweet;
          });

          return { ...page, tweets };
        });

        return { ...oldData, pages: newTweets };
      }

      return oldData;
    });
  };

  const updateTweetCache = (action: Action, queryKey: string[]) => {
    queryClient.setQueryData<TweetData>(queryKey, oldData => {
      if (oldData) {
        const count = action === "like" ? 1 : -1;
        const likesArray = action === "like" ? [{ userId: currentUserId }] : [];

        return { ...oldData, _count: { likes: oldData._count.likes + count }, likes: likesArray };
      }

      return oldData;
    });
  };

  const handleLikeTweet = useCallback(() => {
    if (!currentUserId || disabled || likeLoading || unlikeLoading) return;

    if (isLiked) {
      unlikeMutate({ tweetId });

      return;
    }

    likeMutate({ tweetId });
  }, [
    unlikeMutate,
    likeMutate,
    likeLoading,
    unlikeLoading,
    isLiked,
    currentUserId,
    tweetId,
    disabled
  ]);

  return {
    handleLikeTweet,
    likeLoading,
    unlikeLoading,
    isLiked
  };
};
