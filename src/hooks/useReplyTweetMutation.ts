import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RepliesTweetResponse } from "api/tweet/repliesTweet";
import type { ReplyData, ReplyTweetRequest, ReplyTweetResponse } from "api/tweet/replyTweet";
import type { TweetData } from "api/tweet/timelineTweets";
import type { AxiosError } from "axios";
import { replyTweet } from "network/tweet/replyTweet";
import { setAuthRequiredModalOpen } from "store/slices/globalSlice";
import { useAppDispatch } from "store/store";
import { updateInfiniteTweetsCache, updateTweetCache } from "utils/updateCacheUtils";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

interface UseReplyTweetMutationProps {
  tweetId: string;
  onSuccess?: (data: ReplyTweetResponse) => void;
}

export const useReplyTweetMutation = ({ tweetId, onSuccess }: UseReplyTweetMutationProps) => {
  const queryClient = useQueryClient();
  const { session } = useAppSession();
  const sessionUserId = session?.user.id ?? "";
  const dispatch = useAppDispatch();
  const { handleAddToast } = useToasts();

  const { mutate, isLoading: replyTweetLoading } = useMutation<
    ReplyTweetResponse,
    AxiosError,
    ReplyTweetRequest
  >({
    mutationFn: replyTweet,
    onSuccess: data => {
      const tweetAuthorScreenName = data.tweet.author.screenName;
      const updateTweets = (data: TweetData) => {
        return {
          ...data,
          _count: { ...data._count, replies: data._count.replies + 1 }
        };
      };

      addReplyToCache(data, ["replies", "tweet", tweetId, "infinite"]);
      updateInfiniteTweetsCache(queryClient, [], tweetId, updateTweets);
      updateInfiniteTweetsCache(queryClient, [tweetAuthorScreenName], tweetId, updateTweets);
      updateTweetCache(queryClient, [tweetAuthorScreenName, tweetId], data => {
        return {
          ...data,
          _count: { ...data._count, replies: data._count.replies + 1 }
        };
      });

      onSuccess?.(data);
    },

    onError: error => {
      handleAddToast("error", error?.message);
    }
  });

  const addReplyToCache = (data: ReplyData, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: RepliesTweetResponse[] }>(queryKey, oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                replies: [data, ...page.replies]
              }
            : page
        )
      };
    });
  };

  const handleReplyTweet = useCallback(
    (data: ReplyTweetRequest) => {
      if (!sessionUserId) {
        dispatch(setAuthRequiredModalOpen(true));

        return;
      }

      if (replyTweetLoading) return;

      mutate(data);
    },
    [mutate, replyTweetLoading, sessionUserId, dispatch]
  );

  return { handleReplyTweet, replyTweetLoading };
};
