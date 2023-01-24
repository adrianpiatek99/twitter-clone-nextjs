import { QueryClient, useMutation } from "@tanstack/react-query";
import { LikeTweetRequest } from "api/tweet/likeTweet";
import { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import { AxiosError } from "axios";
import { likeTweet } from "network/tweet/likeTweet";
import { unlikeTweet } from "network/tweet/unlikeTweet";
import { reloadSession } from "utils/session";

import { useToasts } from "./useToasts";

interface UseLikeTweetMutationProps {
  queryClient: QueryClient;
  userId: string | undefined;
  tweetId: string;
  likes: TweetData["likes"];
  disabled?: boolean;
}

export interface UseLikeTweetMutationReturn {
  likeLoading: boolean;
  unlikeLoading: boolean;
  handleLikeTweet: () => void;
  isLiked: boolean;
}

export const useLikeTweetMutation = ({
  queryClient,
  tweetId,
  userId = "",
  likes,
  disabled = false
}: UseLikeTweetMutationProps) => {
  const { handleAddToast } = useToasts();
  const isLiked = likes.some(like => like.userId === userId);
  const likeMutation = useMutation<unknown, AxiosError, LikeTweetRequest>({
    mutationFn: likeTweet,
    onSuccess: () => {
      // Update the like for the specific cached tweet on the home page
      updateCache("like", ["tweets", "infinite"]);
      // Update the like for the specific cached tweet on the profile page
      updateCache("like", ["tweets", "user", userId, "infinite"]);

      reloadSession();
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });
  const unlikeMutation = useMutation({
    mutationFn: unlikeTweet,
    onSuccess: () => {
      updateCache("unlike", ["tweets", "infinite"]);
      updateCache("unlike", ["tweets", "user", userId, "infinite"]);

      reloadSession();
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });
  const likeLoading = likeMutation.isLoading;
  const unlikeLoading = unlikeMutation.isLoading;

  const updateCache = (action: "like" | "unlike", queryKey: string[]) => {
    queryClient.setQueryData<{ pages: TimelineTweetsResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const count = action === "like" ? 1 : -1;
        const likesArray = action === "like" ? [{ userId }] : [];

        const newTweets = oldData.pages.map(page => {
          const tweets = page.tweets.map(tweet => {
            if (tweet.id === tweetId) {
              return { ...tweet, likes: likesArray, _count: { likes: tweet._count.likes + count } };
            }

            return tweet;
          });

          return { ...page, tweets };
        });

        return { ...oldData, pages: newTweets };
      }

      return oldData;
    });
  };

  const handleLikeTweet = () => {
    if (likeLoading || unlikeLoading || !userId || disabled) return;

    if (isLiked) {
      unlikeMutation.mutate({ tweetId });

      return;
    }

    likeMutation.mutate({ tweetId });
  };

  return {
    handleLikeTweet,
    likeLoading,
    unlikeLoading,
    isLiked,
    like: { ...likeMutation },
    unLike: { ...unlikeMutation }
  };
};
