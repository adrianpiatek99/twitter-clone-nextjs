import type { FollowersRequest, FollowersResponse } from "api/user/followers";
import { followersPath } from "api/user/followers";
import { getPromise } from "network/basePromises";

export async function followers(payload: FollowersRequest) {
  return getPromise<FollowersRequest, FollowersResponse>(followersPath, payload);
}
