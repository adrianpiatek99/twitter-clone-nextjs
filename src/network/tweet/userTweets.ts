import { userTweetsPath, UserTweetsRequest, UserTweetsResponse } from "api/tweet/userTweets";
import { getPromise } from "network/basePromises";

export async function userTweets(payload: UserTweetsRequest) {
  return getPromise<UserTweetsRequest, UserTweetsResponse>(userTweetsPath, payload);
}
