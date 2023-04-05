import type { QueryClient } from "@tanstack/react-query";
import type {
  FollowUserData,
  UserByScreenNameInputs,
  UserData,
  UserFollowersInputs,
  UserFollowersOutputs,
  UserFollowingInputs,
  UserFollowingOutputs
} from "types/user";

import { queryKeys } from "./queryKeys";

type Action = "follow" | "unfollow";
type FollowedBy = FollowUserData["followedBy"];

type UpdateFollowsCacheProps<TInput> = {
  queryClient: QueryClient;
  followUserId: string;
  sessionUserId: string;
  input: TInput;
  action: Action;
};
type SharedProps<TInput> = Omit<UpdateFollowsCacheProps<TInput>, "sessionUserId" | "action"> & {
  followedBy: FollowedBy;
};

export const updateFollowsCache = ({
  action,
  sessionUserId,
  ...props
}: UpdateFollowsCacheProps<UserFollowingInputs & UserFollowersInputs & UserByScreenNameInputs>) => {
  const followedBy: FollowUserData["followedBy"] =
    action === "follow" ? [{ followerId: sessionUserId }] : [];
  const sharedProps = { ...props, followedBy };

  updateFollowingCache(sharedProps);
  updateFollowersCache(sharedProps);
  updateUserFollowCache({ ...sharedProps, action });
};

const updateFollowingCache = ({
  queryClient,
  followUserId,
  input,
  followedBy
}: SharedProps<UserFollowingInputs>) => {
  queryClient.setQueryData<{ pages: UserFollowingOutputs[] }>(
    queryKeys.userFollowingQueryKey({ ...input }),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        following: page.following.map(follow => {
          if (follow.followingId === followUserId) {
            return {
              ...follow,
              following: {
                ...follow.following,
                followedBy
              }
            };
          }

          return follow;
        })
      }));

      return { ...oldData, pages };
    }
  );
};

const updateFollowersCache = ({
  queryClient,
  followUserId,
  input,
  followedBy
}: SharedProps<UserFollowersInputs>) => {
  queryClient.setQueryData<{ pages: UserFollowersOutputs[] }>(
    queryKeys.userFollowersQueryKey(input),
    oldData => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map(page => ({
        ...page,
        followers: page.followers.map(follow => {
          if (follow.followerId === followUserId) {
            return {
              ...follow,
              follower: {
                ...follow.follower,
                followedBy
              }
            };
          }

          return follow;
        })
      }));

      return { ...oldData, pages };
    }
  );
};

const updateUserFollowCache = ({
  queryClient,
  input,
  action,
  followedBy
}: SharedProps<UserByScreenNameInputs> & { action: Action }) => {
  queryClient.setQueryData<UserData>(queryKeys.userByScreenNameQueryKey(input), oldData => {
    if (!oldData) return oldData;

    const count = action === "follow" ? 1 : -1;
    const followedByCount = oldData._count.followedBy + count;

    return {
      ...oldData,
      _count: { ...oldData._count, followedBy: followedByCount },
      followedBy
    };
  });
};
