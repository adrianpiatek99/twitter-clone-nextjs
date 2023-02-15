import type { LikedTweetsRequest, LikedTweetsResponse } from "api/tweet/likedTweets";
import { likedTweetsPath } from "api/tweet/likedTweets";
import { getPromise } from "network/basePromises";

export async function likedTweets(payload: LikedTweetsRequest) {
  return getPromise<LikedTweetsRequest, LikedTweetsResponse>(likedTweetsPath, payload);
}
