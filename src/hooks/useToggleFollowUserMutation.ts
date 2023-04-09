import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useGlobalStore from "store/globalStore";
import type { FollowUserData } from "types/user";
import { api } from "utils/api";
import { updateFollowsCache } from "utils/updateFollowsCache";

import { useAppSession } from "./useAppSession";
import { useToasts } from "./useToasts";

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
      updateFollowsCache({
        queryClient,
        followUserId: id,
        input: { screenName: queryScreenName },
        sessionUserId,
        action: "follow"
      });
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });
  const { mutate: unfollowMutate, isLoading: unfollowUserLoading } = api.user.unfollow.useMutation({
    onSuccess: () => {
      updateFollowsCache({
        queryClient,
        followUserId: id,
        input: { screenName: queryScreenName },
        sessionUserId,
        action: "unfollow"
      });
    },
    onError: error => {
      handleAddToast("error", error.message);
    }
  });

  const handleFollowUser = () => {
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
  };

  return {
    handleFollowUser,
    followUserLoading,
    unfollowUserLoading,
    isFollowed
  };
};
