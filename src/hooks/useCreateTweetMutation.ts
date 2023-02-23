import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import type { TweetCreateInputs, TweetCreateOutputs } from "types/tweet";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";
import { addTweetInfiniteCache } from "utils/updateQueryCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  onSuccess?: (data: TweetCreateOutputs) => void;
  onSettled?: () => void;
}

export const useCreateTweetMutation = ({ onSuccess, onSettled }: UseCreateTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const sessionUserScreenName = session?.user.screenName;
  const { mutate, isLoading: createTweetLoading } = api.tweet.create.useMutation({
    onSuccess: data => {
      addTweetInfiniteCache(queryClient, data, queryKeys.tweetTimelineQueryKey());

      if (sessionUserScreenName) {
        addTweetInfiniteCache(
          queryClient,
          data,
          queryKeys.tweetProfileTimelineQueryKey({ profileScreenName: sessionUserScreenName })
        );
      }

      handleAddToast("success", "Tweet was created.");
      onSuccess?.(data);
    },

    onError: error => {
      handleAddToast("error", error?.message);
    },
    onSettled: () => {
      onSettled?.();
    }
  });

  const handleCreateTweet = useCallback(
    (data: TweetCreateInputs) => {
      if (createTweetLoading) return;

      mutate(data);
    },
    [mutate, createTweetLoading]
  );

  return { handleCreateTweet, createTweetLoading };
};
