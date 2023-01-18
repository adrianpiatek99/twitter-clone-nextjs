import { createTweetPath, CreateTweetRequest, CreateTweetResponse } from "api/tweet/createTweet";
import axios from "axios";

export const createTweet = async (payload: CreateTweetRequest) => {
  return axios.post<CreateTweetRequest, CreateTweetResponse>(createTweetPath, payload);
};
