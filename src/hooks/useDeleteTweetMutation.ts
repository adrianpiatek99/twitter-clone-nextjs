import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "types/react-query";
import type { TweetData, TweetTimelineOutputs } from "types/tweet";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  tweetData: TweetData;
  onSuccess?: () => void;
}

export const useDeleteTweetMutation = ({
  tweetData: { id: tweetId, authorId },
  onSuccess
}: UseDeleteTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id;
  const sessionUserScreenName = session?.user.screenName;

  const { mutate, isLoading: deleteLoading } = api.tweet.delete.useMutation({
    onSuccess: () => {
      removeTweetFromTimelineCache(queryKeys.tweetTimelineQueryKey());

      if (sessionUserScreenName) {
        removeTweetFromTimelineCache(
          queryKeys.tweetProfileTimelineQueryKey({ profileScreenName: sessionUserScreenName })
        );
        queryClient.removeQueries(
          queryKeys.tweetDetailsQueryKey({ screenName: sessionUserScreenName, tweetId })
        );
      }

      onSuccess?.();
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });

  const removeTweetFromTimelineCache = (queryKey: QueryKey<unknown>) => {
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

  const handleDeleteTweet = useCallback(() => {
    if (deleteLoading || sessionUserId !== authorId) return;

    mutate({ tweetId });
  }, [mutate, sessionUserId, authorId, tweetId, deleteLoading]);

  return {
    handleDeleteTweet,
    deleteLoading
  };
};
