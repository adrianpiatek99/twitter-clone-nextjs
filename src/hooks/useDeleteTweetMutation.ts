import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteTweetRequest } from "api/tweet/deleteTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { deleteTweet } from "network/tweet/deleteTweet";
import { reloadSession } from "utils/session";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  tweetData: TweetData;
  onSuccess?: () => void;
}

export interface UseDeleteTweetMutationReturn {
  handleDeleteTweet: () => void;
  deleteLoading: boolean;
}

export const useDeleteTweetMutation = ({
  tweetData: {
    id: tweetId,
    authorId,
    author: { screenName }
  },
  onSuccess
}: UseDeleteTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const currentUserId = session?.user.id;

  const deleteTweetMutation = useMutation<unknown, AxiosError, DeleteTweetRequest>({
    mutationFn: deleteTweet,
    onSuccess: () => {
      updateCache(["tweets", "infinite"]);
      updateCache(["tweets", screenName, "infinite"]);
      queryClient.removeQueries(["tweets", tweetId]);

      onSuccess?.();

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
