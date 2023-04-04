import { useQueryClient } from "@tanstack/react-query";
import useGlobalStore from "store/globalStore";
import useProfileStore from "store/profileStore";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";
import type { UpdateTweenFnc } from "utils/updateTweetsCache";
import { updateTweetsCache } from "utils/updateTweetsCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseToggleLikeTweetMutationProps {
  tweetData: TweetData;
  disabled?: boolean;
}

export const useToggleLikeTweetMutation = ({
  tweetData: { id: tweetId, likes },
  disabled = false
}: UseToggleLikeTweetMutationProps) => {
  const { session } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(state => state.openAuthRequiredModal);
  const queryClient = useQueryClient();
  const { handleAddToast } = useToasts();
  const viewedProfileScreenName = useProfileStore(state => state.viewedProfile?.screenName ?? "");
  const sessionUserId = session?.user.id ?? "";
  const isLiked = likes.some(({ userId }) => userId === sessionUserId);
  const { mutate: likeMutate, isLoading: likeLoading } = api.tweet.like.useMutation({
    onSuccess: () => {
      const updateTweet = (data: TweetData) => ({
        ...data,
        likes: [{ userId: sessionUserId }],
        _count: { ...data._count, likes: data._count.likes + 1 }
      });

      updateCache(updateTweet);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });
  const { mutate: unlikeMutate, isLoading: unlikeLoading } = api.tweet.unlike.useMutation({
    onSuccess: () => {
      const updateTweet = (data: TweetData) => ({
        ...data,
        likes: [],
        _count: { ...data._count, likes: data._count.likes === 0 ? 0 : data._count.likes - 1 }
      });

      updateCache(updateTweet);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateCache = (updateTweet: UpdateTweenFnc) => {
    updateTweetsCache({
      queryClient,
      tweetId,
      input: {
        tweetId,
        profileScreenName: viewedProfileScreenName
      },
      updateTweet
    });
  };

  const handleLikeTweet = () => {
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
  };

  return {
    handleLikeTweet,
    likeLoading,
    unlikeLoading,
    isLiked
  };
};
