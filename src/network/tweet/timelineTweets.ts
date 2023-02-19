import type { TimelineTweetsRequest, TimelineTweetsResponse } from "api/tweet/timelineTweets";
import { timelineTweetsPath } from "api/tweet/timelineTweets";
import { getPromise } from "network/basePromises";

export async function timelineTweets(payload: TimelineTweetsRequest) {
  return getPromise<TimelineTweetsRequest, TimelineTweetsResponse>(timelineTweetsPath, payload);
}
