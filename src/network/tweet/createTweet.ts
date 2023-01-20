import { createTweetPath, CreateTweetRequest, CreateTweetResponse } from "api/tweet/createTweet";
import { postPromise } from "network/basePromises";

export async function createTweet(payload: CreateTweetRequest) {
  return postPromise<CreateTweetRequest, CreateTweetResponse>(createTweetPath, payload);
}
