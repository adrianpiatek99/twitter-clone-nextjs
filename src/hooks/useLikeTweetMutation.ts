import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LikeTweetRequest } from "api/tweet/likeTweet";
import type { TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { likeTweet } from "network/tweet/likeTweet";
import { unlikeTweet } from "network/tweet/unlikeTweet";
import { setAuthRequiredModalOpen } from "store/slices/globalSlice";
import { useAppDispatch } from "store/store";
import { updateInfiniteTweetsCache, updateTweetCache } from "utils/updateCacheUtils";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

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
  const dispatch = useAppDispatch();
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id ?? "";
  const isLiked = likes.some(({ userId }) => userId === sessionUserId);

  const { mutate: likeMutate, isLoading: likeLoading } = useMutation<
    unknown,
    AxiosError,
    LikeTweetRequest
  >({
    mutationFn: likeTweet,
    onSuccess: () => {
      const updateTweets = data => {
        return {
          ...data,
          likes: [{ userId: sessionUserId }],
          _count: { ...data._count, likes: data._count.likes + 1 }
        };
      };

      updateInfiniteTweetsCache(queryClient, [], tweetId, updateTweets);
      updateInfiniteTweetsCache(queryClient, [screenName], tweetId, updateTweets);
      updateTweetCache(queryClient, [screenName, tweetId], updateTweets);
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
      const updateTweets = data => {
        return {
          ...data,
          likes: [],
          _count: { ...data._count, likes: data._count.likes === 0 ? 0 : data._count.likes - 1 }
        };
      };

      updateInfiniteTweetsCache(queryClient, [], tweetId, updateTweets);
      updateInfiniteTweetsCache(queryClient, [screenName], tweetId, updateTweets);
      updateTweetCache(queryClient, [screenName, tweetId], updateTweets);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const handleLikeTweet = useCallback(() => {
    if (!sessionUserId) {
      dispatch(setAuthRequiredModalOpen(true));

      return;
    }

    if (disabled || likeLoading || unlikeLoading) return;

    if (isLiked) {
      unlikeMutate({ tweetId });

      return;
    }

    likeMutate({ tweetId });
  }, [
    dispatch,
    unlikeMutate,
    likeMutate,
    likeLoading,
    unlikeLoading,
    isLiked,
    sessionUserId,
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
