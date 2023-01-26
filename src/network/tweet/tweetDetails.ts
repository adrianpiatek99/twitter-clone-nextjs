import type { TweetDetailsRequest, TweetDetailsResponse } from "api/tweet/tweetDetails";
import { tweetDetailsPath } from "api/tweet/tweetDetails";
import { getPromise } from "network/basePromises";

export async function tweetDetails(payload: TweetDetailsRequest) {
  return getPromise<TweetDetailsRequest, TweetDetailsResponse>(tweetDetailsPath, payload);
}
