import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useGlobalStore from "store/globalStore";
import type { QueryKey } from "types/react-query";
import type {
  FollowUserData,
  UserByScreenNameInputs,
  UserData,
  UserFollowersOutputs,
  UserFollowingOutputs
} from "types/user";
import { api } from "utils/api";
import { queryKeys } from "utils/queryKeys";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

type Action = "follow" | "unfollow";

interface UseToggleFollowUserMutationProps {
  followUser: FollowUserData;
}

export const useToggleFollowUserMutation = ({
  followUser: { id, followedBy }
}: UseToggleFollowUserMutationProps) => {
  const queryClient = useQueryClient();
  const { query } = useRouter();
  const { session } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(state => state.openAuthRequiredModal);
  const { handleAddToast } = useToasts();
  const sessionUserId = session?.user.id ?? "";
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const isFollowed = followedBy?.some(({ followerId }) => followerId === sessionUserId);
  const { mutate: followMutate, isLoading: followUserLoading } = api.user.follow.useMutation({
    onSuccess: () => {
      updateFollowingInfiniteCache(
        "follow",
        queryKeys.userFollowingQueryKey({ screenName: queryScreenName })
      );
      updateFollowersInfiniteCache(
        "follow",
        queryKeys.userFollowersQueryKey({ screenName: queryScreenName })
      );
      updateFollowCache(
        "follow",
        queryKeys.userByScreenNameQueryKey({ screenName: queryScreenName })
      );
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });
  const { mutate: unfollowMutate, isLoading: unfollowUserLoading } = api.user.unfollow.useMutation({
    onSuccess: () => {
      updateFollowingInfiniteCache(
        "unfollow",
        queryKeys.userFollowingQueryKey({ screenName: queryScreenName })
      );
      updateFollowersInfiniteCache(
        "unfollow",
        queryKeys.userFollowersQueryKey({ screenName: queryScreenName })
      );
      updateFollowCache(
        "unfollow",
        queryKeys.userByScreenNameQueryKey({ screenName: queryScreenName })
      );
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const updateFollowersInfiniteCache = (action: Action, queryKey: QueryKey<unknown>) => {
    queryClient.setQueryData<{ pages: UserFollowersOutputs[] }>(queryKey, oldData => {
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

  const updateFollowingInfiniteCache = (action: Action, queryKey: QueryKey<unknown>) => {
    queryClient.setQueryData<{ pages: UserFollowingOutputs[] }>(queryKey, oldData => {
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

  const updateFollowCache = (action: Action, queryKey: QueryKey<UserByScreenNameInputs>) => {
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
