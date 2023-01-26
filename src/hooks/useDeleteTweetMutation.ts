import type { QueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { DeleteTweetRequest } from "api/tweet/deleteTweet";
import type { TimelineTweetsResponse } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { deleteTweet } from "network/tweet/deleteTweet";
import { reloadSession } from "utils/session";

import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  queryClient: QueryClient;
  tweetId: string;
  currentUserId: string | undefined;
  authorId: string | undefined;
  onSuccess?: () => void;
}

export interface UseDeleteTweetMutationReturn {
  handleDeleteTweet: () => void;
  deleteLoading: boolean;
}

export const useDeleteTweetMutation = ({
  queryClient,
  tweetId,
  currentUserId = "",
  authorId = "",
  onSuccess
}: UseDeleteTweetMutationProps) => {
  const { handleAddToast } = useToasts();
  const deleteTweetMutation = useMutation<unknown, AxiosError, DeleteTweetRequest>({
    mutationFn: deleteTweet,
    onSuccess: () => {
      onSuccess?.();

      // Remove the tweet from the cache on the home page
      updateCache(["tweets", "infinite"]);
      // Remove the tweet from the cache on the  profile page
      updateCache(["tweets", "user", authorId, "infinite"]);

      queryClient.removeQueries(["tweet", tweetId]);

      reloadSession();
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });
  const deleteLoading = deleteTweetMutation.isLoading;

  const updateCache = (queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const newTweets = oldData.pages.map(page => {
          const tweets = page.tweets.filter(tweet => tweet.id !== tweetId);

          return { ...page, tweets };
        });

        return { ...oldData, pages: newTweets };
      }

      return oldData;
    });
  };

  const handleDeleteTweet = () => {
    if (deleteLoading || currentUserId !== authorId) return;

    deleteTweetMutation.mutate({ tweetId });
  };

  return { handleDeleteTweet, deleteLoading, ...deleteTweetMutation };
};
