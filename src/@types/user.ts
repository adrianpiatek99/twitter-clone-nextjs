import type { Follows, User } from "@prisma/client";
import type { RouterInputs, RouterOutputs } from "utils/api";

type UserCount = {
  _count: { tweets: number; likes: number; followedBy: number; following: number };
};

type FollowedBy = { followedBy: Pick<Follows, "followerId">[] };

export type UserData = Omit<User, "password" | "email"> & UserCount & FollowedBy;

export type FollowUserData = UserFollowingOutputs["following"][number]["following"];

export type UserByScreenNameInputs = RouterInputs["user"]["byScreenName"];

export type UserByScreenNameOutputs = RouterOutputs["user"]["byScreenName"];

export type UserFollowInputs = RouterInputs["user"]["follow"];

export type UserUnfollowInputs = RouterInputs["user"]["unfollow"];

export type UserFollowingInputs = RouterInputs["user"]["following"];

export type UserFollowingOutputs = RouterOutputs["user"]["following"];

export type UserFollowersInputs = RouterInputs["user"]["followers"];

export type UserFollowersOutputs = RouterOutputs["user"]["followers"];
