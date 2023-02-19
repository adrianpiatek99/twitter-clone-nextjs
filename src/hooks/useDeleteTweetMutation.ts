import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { DeleteTweetRequest } from "api/tweet/deleteTweet";
import type { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { deleteTweet } from "network/tweet/deleteTweet";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseDeleteTweetMutationProps {
  tweetData: TweetData;
  onSuccess?: () => void;
}

export const useDeleteTweetMutation = ({
  tweetData: { id: tweetId, authorId },
  onSuccess
}: UseDeleteTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id;
  const sessionScreenName = session?.user.screenName;

  const { mutate, isLoading: deleteLoading } = useMutation<unknown, AxiosError, DeleteTweetRequest>(
    {
      mutationFn: deleteTweet,
      onSuccess: () => {
        updateCache(["tweets", "infinite"]);
        queryClient.removeQueries(["tweet", sessionScreenName, tweetId]);

        if (sessionScreenName) {
          updateCache(["tweets", sessionScreenName, "infinite"]);
        }

        onSuccess?.();
      },
      onError: (error: any) => {
        handleAddToast("error", error?.message);
      }
    }
  );

  const updateCache = (queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          tweets: page.tweets.filter(tweet => tweet.id !== tweetId)
        }))
      };
    });
  };

  const handleDeleteTweet = useCallback(() => {
    if (deleteLoading || sessionUserId !== authorId) return;

    mutate({ tweetId });
  }, [mutate, sessionUserId, authorId, tweetId, deleteLoading]);

  return {
    handleDeleteTweet,
    deleteLoading
  };
};
