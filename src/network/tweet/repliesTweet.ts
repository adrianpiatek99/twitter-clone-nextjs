import type { RepliesTweetRequest, RepliesTweetResponse } from "api/tweet/repliesTweet";
import { repliesTweetPath } from "api/tweet/repliesTweet";
import { getPromise } from "network/basePromises";

export async function repliesTweet(payload: RepliesTweetRequest) {
  return getPromise<RepliesTweetRequest, RepliesTweetResponse>(repliesTweetPath, payload);
}
