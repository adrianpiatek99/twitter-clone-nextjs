import type { FollowUserRequest } from "api/user/followUser";
import { followUserPath } from "api/user/followUser";
import { emptyPostPromise } from "network/basePromises";

export async function followUser(payload: FollowUserRequest) {
  return emptyPostPromise<FollowUserRequest>(followUserPath, payload);
}
