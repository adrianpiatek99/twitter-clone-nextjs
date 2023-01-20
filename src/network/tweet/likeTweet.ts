import { likeTweetPath, LikeTweetRequest } from "api/tweet/likeTweet";
import { emptyPostPromise } from "network/basePromises";

export async function likeTweet(payload: LikeTweetRequest) {
  return emptyPostPromise<LikeTweetRequest>(likeTweetPath, payload);
}
