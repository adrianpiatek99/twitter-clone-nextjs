import { unlikeTweetPath, UnlikeTweetRequest } from "api/tweet/unlikeTweet";
import { deletePromise } from "network/basePromises";

export async function unlikeTweet(payload: UnlikeTweetRequest) {
  return deletePromise<UnlikeTweetRequest>(unlikeTweetPath, payload);
}
