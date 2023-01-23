import { QueryClient, useMutation } from "@tanstack/react-query";
import { TimelineTweetsResponse } from "api/tweet/timelineTweets";
import { deleteTweet } from "network/tweet/deleteTweet";
import { reloadSession } from "utils/session";

import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  queryClient: QueryClient;
  tweetId: string;
  userId: string;
}

export interface UseDeleteTweetMutationReturn {
  handleDeleteTweet: () => void;
  deleteLoading: boolean;
}

export const useDeleteTweetMutation = ({
  queryClient,
  tweetId,
  userId
}: UseDeleteTweetMutationProps) => {
  const { handleAddToast } = useToasts();
  const deleteTweetMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      // Remove the tweet from the cache on the home page
      updateCache(["tweets", "infinite"]);
      // Remove the tweet from the cache on the  profile page
      updateCache(["tweets", "user", userId, "infinite"]);

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
    if (deleteLoading) return;

    deleteTweetMutation.mutate({ tweetId });
  };

  return { handleDeleteTweet, deleteLoading };
};
