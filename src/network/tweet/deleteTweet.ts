import type { DeleteTweetRequest } from "api/tweet/deleteTweet";
import { deleteTweetPath } from "api/tweet/deleteTweet";
import { deletePromise } from "network/basePromises";

export async function deleteTweet(payload: DeleteTweetRequest) {
  return deletePromise<DeleteTweetRequest>(deleteTweetPath, payload);
}
