import * as yup from "yup";

export const TWEET_MAX_LENGTH = 280;

export type TweetValues = {
  text: string;
};

export const tweetSchema: yup.SchemaOf<TweetValues> = yup.object().shape({
  text: yup
    .string()
    .max(TWEET_MAX_LENGTH, `Tweet text can't have more than ${TWEET_MAX_LENGTH} characters.`)
    .required("Tweet text is required")
});
