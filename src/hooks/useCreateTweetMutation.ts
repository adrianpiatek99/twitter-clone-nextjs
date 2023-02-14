import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTweetRequest, CreateTweetResponse } from "api/tweet/createTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { createTweet } from "network/tweet/createTweet";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  onSuccess?: (data: CreateTweetResponse) => void;
  onSettled?: () => void;
}

export interface UseCreateTweetMutationReturn {
  handleCreateTweet: (data: CreateTweetRequest) => void;
  createTweetLoading: boolean;
}

export const useCreateTweetMutation = ({ onSuccess, onSettled }: UseCreateTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const screenName = session?.user.screenName ?? "";

  const { mutate, isLoading: createTweetLoading } = useMutation<
    CreateTweetResponse,
    AxiosError,
    CreateTweetRequest
  >({
    mutationFn: createTweet,
    onSuccess: data => {
      addTweetToCache(data, ["tweets", "infinite"]);
      addTweetToCache(data, ["tweets", screenName, "infinite"]);

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

  const addTweetToCache = (data: TweetData, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                tweets: [data, ...page.tweets]
              }
            : page
        )
      };
    });
  };

  const handleCreateTweet = useCallback(
    (data: CreateTweetRequest) => {
      if (createTweetLoading) return;

      mutate(data);
    },
    [mutate, createTweetLoading]
  );

  return { handleCreateTweet, createTweetLoading };
};
