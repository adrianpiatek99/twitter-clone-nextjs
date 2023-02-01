import type { FollowingRequest, FollowingResponse } from "api/user/following";
import { followingPath } from "api/user/following";
import { getPromise } from "network/basePromises";

export async function following(payload: FollowingRequest) {
  return getPromise<FollowingRequest, FollowingResponse>(followingPath, payload);
}
