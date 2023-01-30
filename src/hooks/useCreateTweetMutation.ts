import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTweetRequest, CreateTweetResponse } from "api/tweet/createTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { createTweet } from "network/tweet/createTweet";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  onSettled?: () => void;
}

export interface UseCreateTweetMutationReturn {
  handleCreateTweet: (data: CreateTweetRequest) => void;
  createTweetLoading: boolean;
}

export const useCreateTweetMutation = ({ onSettled }: UseCreateTweetMutationProps) => {
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
      updateCache(data, ["tweets", "infinite"]);
      updateCache(data, ["tweets", screenName, "infinite"]);

      handleAddToast("success", "Tweet was created.");
    },
    onError: error => {
      handleAddToast("error", error?.message);
    },
    onSettled: () => {
      onSettled?.();
    }
  });

  const updateCache = (data: TweetData, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const newTweets = oldData.pages.map((page, index) => {
          if (index === 0) {
            const tweets = [data, ...page.tweets];

            return { ...page, tweets };
          }

          return page;
        });

        return { ...oldData, pages: newTweets };
      }

      return oldData;
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
