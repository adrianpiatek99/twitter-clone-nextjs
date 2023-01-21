import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTweetRequest } from "api/tweet/createTweet";
import { TimelineTweetsResponse } from "api/tweet/timelineTweets";
import { createTweet } from "network/tweet/createTweet";

import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  onSettled?: () => void;
}

interface UseCreateTweetMutationReturn {
  handleCreateTweet: (data: CreateTweetRequest) => void;
  createTweetLoading: boolean;
}

export const useCreateTweetMutation = ({
  onSettled
}: UseCreateTweetMutationProps): UseCreateTweetMutationReturn => {
  const { handleAddToast } = useToasts();
  const queryClient = useQueryClient();
  const createTweetMutation = useMutation({
    mutationFn: createTweet,
    onSuccess: data => {
      queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(
        ["tweets", "infinite"],
        oldData => {
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
        }
      );

      handleAddToast("success", "Tweet was created.");
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    },
    onSettled: () => {
      onSettled?.();
    }
  });
  const createTweetLoading = createTweetMutation.isLoading;

  const handleCreateTweet = (data: CreateTweetRequest) => {
    if (createTweetLoading) return;

    createTweetMutation.mutate(data);
  };

  return { handleCreateTweet, createTweetLoading };
};
