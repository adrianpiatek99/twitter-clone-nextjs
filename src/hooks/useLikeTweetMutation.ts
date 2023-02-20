import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LikedTweetsResponse } from "api/tweet/likedTweets";
import type { LikeTweetRequest } from "api/tweet/likeTweet";
import type { TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { likeTweet } from "network/tweet/likeTweet";
import { unlikeTweet } from "network/tweet/unlikeTweet";
import useGlobalStore from "store/globalStore";
import { updateInfiniteTweetsCache, updateTweetCache } from "utils/updateQueryCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseLikeTweetMutationProps {
  tweetData: TweetData;
  disabled?: boolean;
}

export const useLikeTweetMutation = ({
  tweetData: { id: tweetId, likes },
  disabled = false
}: UseLikeTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(store => store.openAuthRequiredModal);
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id;
  const sessionUserScreenName = session?.user.screenName;
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
      updateInfiniteLikedTweetsCache(updateTweets);

      if (sessionUserScreenName) {
        updateInfiniteTweetsCache(queryClient, [sessionUserScreenName], tweetId, updateTweets);
        updateTweetCache(queryClient, [sessionUserScreenName, tweetId], updateTweets);
      }
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
      updateInfiniteLikedTweetsCache(updateTweets);

      if (sessionUserScreenName) {
        updateInfiniteTweetsCache(queryClient, [sessionUserScreenName], tweetId, updateTweets);
        updateTweetCache(queryClient, [sessionUserScreenName, tweetId], updateTweets);
      }
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateInfiniteLikedTweetsCache = (updateData: (data: TweetData) => TweetData) => {
    queryClient.setQueryData<{ pages: LikedTweetsResponse[] }>(
      ["likedTweets", sessionUserScreenName, "infinite"],
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
                  return { ...like, tweet: updateData(tweet) };
                }

                return like;
              })
            };
          })
        };
      }
    );
  };

  const handleLikeTweet = useCallback(() => {
    if (!sessionUserId) {
      openAuthRequiredModal(true);

      return;
    }

    if (disabled || likeLoading || unlikeLoading) return;

    if (isLiked) {
      unlikeMutate({ tweetId });

      return;
    }

    likeMutate({ tweetId });
  }, [
    openAuthRequiredModal,
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
