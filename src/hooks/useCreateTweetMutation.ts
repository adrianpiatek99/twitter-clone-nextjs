import { useQueryClient } from "@tanstack/react-query";
import type { TweetCreateInputs, TweetCreateOutputs } from "types/tweet";
import { addTweetCache } from "utils/addTweetCache";
import { api } from "utils/api";

import { useToasts } from "./useToasts";

interface UseCreateTweetMutationProps {
  onSuccess?: (data: TweetCreateOutputs) => void;
  onSettled?: () => void;
}

export const useCreateTweetMutation = ({ onSuccess, onSettled }: UseCreateTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { handleAddToast } = useToasts();
  const { mutate, isLoading: createTweetLoading } = api.tweet.create.useMutation({
    onSuccess: data => {
      const screenName = data.author.screenName;

      addTweetCache({
        queryClient,
        newTweet: data,
        input: { profileScreenName: screenName }
      });

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

  const handleCreateTweet = (data: TweetCreateInputs) => {
    if (createTweetLoading) return;

    mutate(data);
  };

  return { handleCreateTweet, createTweetLoading };
};
