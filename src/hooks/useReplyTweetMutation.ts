import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import useGlobalStore from "store/globalStore";
import useProfileStore from "store/profileStore";
import type { TweetData } from "types/tweet";
import type { TweetReplyCreateInputs, TweetReplyCreateOutputs } from "types/tweetReply";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";
import {
  addReplyInfiniteCache,
  updateLikesTweetInfiniteCache,
  updateProfileTweetInfiniteCache,
  updateTweetDetailsCache,
  updateTweetInfiniteCache
} from "utils/updateQueryCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseReplyTweetMutationProps {
  tweetId: string;
  onSuccess?: (data: TweetReplyCreateOutputs) => void;
}

export const useReplyTweetMutation = ({ tweetId, onSuccess }: UseReplyTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const sessionUserId = session?.user.id ?? "";
  const openAuthRequiredModal = useGlobalStore(state => state.openAuthRequiredModal);
  const viewedProfile = useProfileStore(state => state.viewedProfile);
  const { handleAddToast } = useToasts();

  const { mutate, isLoading: replyTweetLoading } = api.tweetReply.create.useMutation({
    onSuccess: data => {
      const tweetAuthorScreenName = data.tweet.author.screenName;
      const updateTweets = (data: TweetData) => {
        return {
          ...data,
          _count: { ...data._count, replies: data._count.replies + 1 }
        };
      };

      addReplyInfiniteCache(queryClient, data, queryKeys.tweetRepliesQueryKey({ tweetId }));
      updateTweetInfiniteCache(queryClient, tweetId, updateTweets);
      updateProfileTweetInfiniteCache(
        queryClient,
        tweetId,
        { profileScreenName: tweetAuthorScreenName },
        updateTweets
      );

      if (viewedProfile) {
        updateLikesTweetInfiniteCache(
          queryClient,
          tweetId,
          { profileId: viewedProfile.id },
          updateTweets
        );
      }

      updateTweetDetailsCache(
        queryClient,
        queryKeys.tweetDetailsQueryKey({ screenName: tweetAuthorScreenName, tweetId }),
        data => {
          return {
            ...data,
            _count: { ...data._count, replies: data._count.replies + 1 }
          };
        }
      );

      onSuccess?.(data);
    },
    onError: error => {
      handleAddToast("error", error?.message);
    }
  });

  const handleReplyTweet = useCallback(
    (data: TweetReplyCreateInputs) => {
      if (!sessionUserId) {
        openAuthRequiredModal(true);

        return;
      }

      if (replyTweetLoading) return;

      mutate(data);
    },
    [mutate, replyTweetLoading, sessionUserId, openAuthRequiredModal]
  );

  return { handleReplyTweet, replyTweetLoading };
};
