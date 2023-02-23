import { useCallback } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FollowersResponse } from "api/user/followers";
import type { FollowingData, FollowingResponse } from "api/user/following";
import type { FollowUserRequest } from "api/user/followUser";
import type { UserData } from "api/user/userByScreenName";
import type { AxiosError } from "axios";
import { followUser } from "network/user/followUser";
import { unfollowUser } from "network/user/unfollowUser";
import { useRouter } from "next/router";
import useGlobalStore from "store/globalStore";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

type Action = "follow" | "unfollow";

interface UseFollowUserMutationProps {
  followUser: FollowingData["following"];
}

export const useFollowUserMutation = ({
  followUser: { id, followedBy }
}: UseFollowUserMutationProps) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const { session } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(store => store.openAuthRequiredModal);
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id ?? "";
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const isFollowed = followedBy?.some(({ followerId }) => followerId === sessionUserId);

  const { mutate: followMutate, isLoading: followUserLoading } = useMutation<
    unknown,
    AxiosError,
    FollowUserRequest
  >({
    mutationFn: followUser,
    onSuccess: () => {
      updateFollowingCache("follow", ["following", queryScreenName, "infinite"]);
      updateFollowersCache("follow", ["followers", queryScreenName, "infinite"]);
      updateFollowCache("follow", ["user", queryScreenName]);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const { mutate: unfollowMutate, isLoading: unfollowUserLoading } = useMutation<
    unknown,
    AxiosError,
    FollowUserRequest
  >({
    mutationFn: unfollowUser,
    onSuccess: () => {
      updateFollowingCache("unfollow", ["following", queryScreenName, "infinite"]);
      updateFollowersCache("unfollow", ["followers", queryScreenName, "infinite"]);
      updateFollowCache("unfollow", ["user", queryScreenName]);
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateFollowersCache = (action: Action, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: FollowersResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const followedByArray = action === "follow" ? [{ followerId: sessionUserId }] : [];

        const newFollowing = oldData.pages.map(page => {
          const followers = page.followers.map(follow => {
            if (follow.followerId === id) {
              return {
                ...follow,
                follower: {
                  ...follow.follower,
                  followedBy: followedByArray
                }
              };
            }

            return follow;
          });

          return { ...page, followers };
        });

        return { ...oldData, pages: newFollowing };
      }
    });
  };

  const updateFollowingCache = (action: Action, queryKey: string[]) => {
    queryClient.setQueryData<{ pages: FollowingResponse[] }>(queryKey, oldData => {
      if (oldData) {
        const followedByArray = action === "follow" ? [{ followerId: sessionUserId }] : [];

        const newFollowing = oldData.pages.map(page => {
          const following = page.following.map(follow => {
            if (follow.followingId === id) {
              return {
                ...follow,
                following: {
                  ...follow.following,
                  followedBy: followedByArray
                }
              };
            }

            return follow;
          });

          return { ...page, following };
        });

        return { ...oldData, pages: newFollowing };
      }
    });
  };

  const updateFollowCache = (action: Action, queryKey: string[]) => {
    queryClient.setQueryData<UserData>(queryKey, oldData => {
      if (oldData) {
        const count = action === "follow" ? 1 : -1;
        const followedByArray = action === "follow" ? [{ followerId: sessionUserId }] : [];
        const followedByCount = oldData._count.followedBy + count;

        return {
          ...oldData,
          _count: { ...oldData._count, followedBy: followedByCount },
          followedBy: followedByArray
        };
      }
    });
  };

  const handleFollowUser = useCallback(() => {
    if (!sessionUserId) {
      openAuthRequiredModal(true);

      return;
    }

    if (followUserLoading || unfollowUserLoading || sessionUserId === id) return;

    if (isFollowed) {
      unfollowMutate({ followUserId: id });

      return;
    }

    followMutate({ followUserId: id });
  }, [
    openAuthRequiredModal,
    followMutate,
    unfollowMutate,
    id,
    followUserLoading,
    unfollowUserLoading,
    isFollowed,
    sessionUserId
  ]);

  return {
    handleFollowUser,
    followUserLoading,
    unfollowUserLoading,
    isFollowed
  };
};
