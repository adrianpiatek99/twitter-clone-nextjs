import { deleteTweetPath, DeleteTweetRequest } from "api/tweet/deleteTweet";
import { deletePromise } from "network/basePromises";

export async function deleteTweet(payload: DeleteTweetRequest) {
  return deletePromise<DeleteTweetRequest>(deleteTweetPath, payload);
}
