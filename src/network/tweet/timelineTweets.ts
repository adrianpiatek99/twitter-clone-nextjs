import {
  timelineTweetsPath,
  TimelineTweetsRequest,
  TimelineTweetsResponse
} from "api/tweet/timelineTweets";
import { getPromise } from "network/basePromises";

export async function homeGlobalTimeline(payload: TimelineTweetsRequest) {
  return getPromise<TimelineTweetsRequest, TimelineTweetsResponse>(timelineTweetsPath, payload);
}