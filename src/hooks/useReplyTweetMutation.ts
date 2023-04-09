import type { QueryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useGlobalStore from "store/globalStore";
import useProfileStore from "store/profileStore";
import type { TweetData } from "types/tweet";
import type {
  ReplyData,
  TweetRepliesInputs,
  TweetRepliesOutputs,
  TweetReplyCreateInputs,
  TweetReplyCreateOutputs
} from "types/tweetReply";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";
import { updateTweetsCache } from "utils/updateTweetsCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

type AddTweetReplyCacheProps = {
  queryClient: QueryClient;
  newReply: ReplyData;
  input: TweetRepliesInputs;
};
interface UseReplyTweetMutationProps {
  tweetId: string;
  onSuccess?: (data: TweetReplyCreateOutputs) => void;
}

export const useReplyTweetMutation = ({ tweetId, onSuccess }: UseReplyTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const sessionUserId = session?.user.id ?? "";
  const openAuthRequiredModal = useGlobalStore(state => state.openAuthRequiredModal);
  const viewedProfileScreenName = useProfileStore(state => state.viewedProfile?.screenName ?? "");
  const { handleAddToast } = useToasts();
  const { mutate, isLoading: replyTweetLoading } = api.tweetReply.create.useMutation({
    onSuccess: data => {
      const updateTweet = (data: TweetData) => ({
        ...data,
        _count: { ...data._count, replies: data._count.replies + 1 }
      });

      addTweetReplyCache({ queryClient, newReply: data, input: { tweetId } });

      updateTweetsCache({
        queryClient,
        tweetId,
        input: {
          tweetId,
          profileScreenName: viewedProfileScreenName
        },
        updateTweet
      });

      onSuccess?.(data);
    },
    onError: error => {
      handleAddToast("error", error?.message);
    }
  });

  const addTweetReplyCache = ({ queryClient, newReply, input }: AddTweetReplyCacheProps) => {
    queryClient.setQueryData<{ pages: TweetRepliesOutputs[] }>(
      queryKeys.tweetRepliesQueryKey({ ...input }),
      oldData => {
        if (!oldData) return oldData;

        const pages = oldData.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                replies: [newReply, ...page.replies]
              }
            : page
        );

        return {
          ...oldData,
          pages
        };
      }
    );
  };

  const handleReplyTweet = (data: TweetReplyCreateInputs) => {
    if (!sessionUserId) {
      openAuthRequiredModal(true);

      return;
    }

    if (replyTweetLoading) return;

    mutate(data);
  };

  return { handleReplyTweet, replyTweetLoading };
};
