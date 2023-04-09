import { useQueryClient } from "@tanstack/react-query";
import useProfileStore from "store/profileStore";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";
import { removeTweetCache } from "utils/removeTweetCache";

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
  const viewedProfileScreenName = useProfileStore(state => state.viewedProfile?.screenName ?? "");
  const sessionUserId = session?.user.id;
  const { mutate, isLoading: deleteLoading } = api.tweet.delete.useMutation({
    onSuccess: () => {
      removeTweetCache({
        queryClient,
        tweetId,
        input: {
          profileScreenName: viewedProfileScreenName,
          tweetId
        }
      });

      onSuccess?.();
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });

  const handleDeleteTweet = () => {
    if (deleteLoading || sessionUserId !== authorId) return;

    mutate({ tweetId });
  };

  return {
    handleDeleteTweet,
    deleteLoading
  };
};
