import { QueryClient, useMutation } from "@tanstack/react-query";
import { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import { deleteTweet } from "network/tweet/deleteTweet";

import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  queryClient: QueryClient;
  tweetId: TweetData["id"];
}

export interface UseDeleteTweetMutationReturn {
  handleDeleteTweet: () => void;
  deleteLoading: boolean;
}

export const useDeleteTweetMutation = ({
  queryClient,
  tweetId
}: UseDeleteTweetMutationProps): UseDeleteTweetMutationReturn => {
  const { handleAddToast } = useToasts();
  const deleteTweetMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(
        ["tweets", "infinite"],
        oldData => {
          if (oldData) {
            const newTweets = oldData.pages.map(page => {
              const tweets = page.tweets.filter(tweet => tweet.id !== tweetId);

              return { ...page, tweets };
            });

            return { ...oldData, pages: newTweets };
          }

          return oldData;
        }
      );
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });
  const deleteLoading = deleteTweetMutation.isLoading;

  const handleDeleteTweet = () => {
    if (deleteLoading) return;

    deleteTweetMutation.mutate({ tweetId });
  };

  return { handleDeleteTweet, deleteLoading };
};
