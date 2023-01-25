import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTweetRequest, CreateTweetResponse } from "api/tweet/createTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { createTweet } from "network/tweet/createTweet";
import { reloadSession } from "utils/session";

import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  userId: string;
  onSettled?: () => void;
}

export interface UseCreateTweetMutationReturn {
  handleCreateTweet: (data: CreateTweetRequest) => void;
  createTweetLoading: boolean;
}

export const useCreateTweetMutation = ({ userId, onSettled }: UseCreateTweetMutationProps) => {
  const { handleAddToast } = useToasts();
  const queryClient = useQueryClient();
  const createTweetMutation = useMutation<CreateTweetResponse, AxiosError, CreateTweetRequest>({
    mutationFn: createTweet,
    onSuccess: data => {
      // Add the new tweet to cached tweets on the home page
      updateCache(data, ["tweets", "infinite"]);
      // Add the new tweet to cached tweets on the profile page
      updateCache(data, ["tweets", "user", userId, "infinite"]);

      reloadSession();
      handleAddToast("success", "Tweet was created.");
    },
    onError: error => {
      handleAddToast("error", error?.message);
    },
    onSettled: () => {
      onSettled?.();
    }
  });
  const createTweetLoading = createTweetMutation.isLoading;

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

  const handleCreateTweet = (data: CreateTweetRequest) => {
    if (createTweetLoading) return;

    createTweetMutation.mutate(data);
  };

  return { handleCreateTweet, createTweetLoading };
};
