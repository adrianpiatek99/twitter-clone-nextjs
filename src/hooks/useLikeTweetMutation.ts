import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import useGlobalStore from "store/globalStore";
import useProfileStore from "store/profileStore";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";
import {
  updateLikesTweetInfiniteCache,
  updateProfileTweetInfiniteCache,
  updateTweetDetailsCache,
  updateTweetInfiniteCache
} from "utils/updateQueryCache";

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
  const { session } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(state => state.openAuthRequiredModal);
  const viewedProfile = useProfileStore(state => state.viewedProfile);
  const queryClient = useQueryClient();
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id ?? "";
  const isLiked = likes.some(({ userId }) => userId === sessionUserId);

  const { mutate: likeMutate, isLoading: likeLoading } = api.tweet.like.useMutation({
    onSuccess: () => {
      const updateTweet = (data: TweetData) => {
        return {
          ...data,
          likes: [{ userId: sessionUserId }],
          _count: { ...data._count, likes: data._count.likes + 1 }
        };
      };

      updateCache(updateTweet);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const { mutate: unlikeMutate, isLoading: unlikeLoading } = api.tweet.unlike.useMutation({
    onSuccess: () => {
      const updateTweet = (data: TweetData) => {
        return {
          ...data,
          likes: [],
          _count: { ...data._count, likes: data._count.likes === 0 ? 0 : data._count.likes - 1 }
        };
      };

      updateCache(updateTweet);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateCache = (updateTweet: (data: TweetData) => TweetData) => {
    updateTweetInfiniteCache(queryClient, tweetId, updateTweet);

    updateProfileTweetInfiniteCache(
      queryClient,
      tweetId,
      { profileScreenName: screenName },
      updateTweet
    );

    updateTweetDetailsCache(
      queryClient,
      queryKeys.tweetDetailsQueryKey({ screenName, tweetId }),
      updateTweet
    );

    if (viewedProfile) {
      updateLikesTweetInfiniteCache(
        queryClient,
        tweetId,
        { profileId: viewedProfile.id },
        updateTweet
      );
    }
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
