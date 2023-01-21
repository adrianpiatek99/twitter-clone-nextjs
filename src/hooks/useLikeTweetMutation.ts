import { QueryClient, useMutation } from "@tanstack/react-query";
import { TimelineTweetsResponse, TweetData } from "api/tweet/timelineTweets";
import { likeTweet } from "network/tweet/likeTweet";
import { unlikeTweet } from "network/tweet/unlikeTweet";

import { useToasts } from "./useToasts";

interface UseLikeTweetMutationProps {
  queryClient: QueryClient;
  userId: string | undefined;
  tweetId: TweetData["id"];
  likes: TweetData["likes"];
  disabled?: boolean;
}

export interface UseLikeTweetMutationReturn {
  likeLoading: boolean;
  unlikeLoading: boolean;
  handleLikeTweet: () => void;
  isLiked: boolean;
}

type LikeQueryData = { pages: TimelineTweetsResponse[] };

export const useLikeTweetMutation = ({
  queryClient,
  tweetId,
  userId = "",
  likes,
  disabled = false
}: UseLikeTweetMutationProps): UseLikeTweetMutationReturn => {
  const { handleAddToast } = useToasts();
  const isLiked = likes.some(like => like.userId === userId);
  const queryKey = ["tweets", "infinite"];

  const updateCache = (oldData: LikeQueryData, action: "like" | "unlike") => {
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
  };

  const likeMutation = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.setQueryData<LikeQueryData>(queryKey, oldData => {
        if (oldData) return updateCache(oldData, "like");

        return oldData;
      });
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeTweet,
    onSuccess: () => {
      queryClient.setQueryData<LikeQueryData>(queryKey, oldData => {
        if (oldData) return updateCache(oldData, "unlike");

        return oldData;
      });
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    }
  });

  const likeLoading = likeMutation.isLoading;
  const unlikeLoading = unlikeMutation.isLoading;

  const handleLikeTweet = () => {
    if (likeLoading || unlikeLoading || !userId || disabled) return;

    if (isLiked) {
      unlikeMutation.mutate({ tweetId });

      return;
    }

    likeMutation.mutate({ tweetId });
  };

  return { likeLoading, unlikeLoading, handleLikeTweet, isLiked };
};