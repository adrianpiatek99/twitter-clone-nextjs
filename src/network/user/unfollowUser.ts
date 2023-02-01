import type { UnfollowUserRequest } from "api/user/unfollowUser";
import { unfollowUserPath } from "api/user/unfollowUser";
import { deletePromise } from "network/basePromises";

export async function unfollowUser(payload: UnfollowUserRequest) {
  return deletePromise<UnfollowUserRequest>(unfollowUserPath, payload);
}
