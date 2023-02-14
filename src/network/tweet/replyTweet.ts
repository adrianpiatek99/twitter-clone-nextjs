import type { ReplyTweetRequest, ReplyTweetResponse } from "api/tweet/replyTweet";
import { replyTweetPath } from "api/tweet/replyTweet";
import { postPromise } from "network/basePromises";

export async function replyTweet(payload: ReplyTweetRequest) {
  return postPromise<ReplyTweetRequest, ReplyTweetResponse>(replyTweetPath, payload);
}
