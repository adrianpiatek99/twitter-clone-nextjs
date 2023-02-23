import { z } from "zod";

export const TWEET_MAX_LENGTH = 280;

export type TweetValues = z.infer<typeof tweetSchema>;

export const tweetSchema = z.object({
  text: z
    .string()
    .max(TWEET_MAX_LENGTH, `Tweet text can't have more than ${TWEET_MAX_LENGTH} characters.`)
});
