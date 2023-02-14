import type { SignUpResponse } from "api/auth/signUp";
import { signUpPath } from "api/auth/signUp";
import type { CreateTweetResponse } from "api/tweet/createTweet";
import { createTweetPath } from "api/tweet/createTweet";
import { rest } from "msw";
import { mockedTweet } from "./tweet.mock";
import { mockedUser } from "./user.mock";

const ms = (duration: number) => {
  return process.env.APP_ENV === "testing" ? 0 : duration;
};

const DEFAULT_DELAY = 1000 * 2;

export const apiMockHandlers = [
  rest.post(signUpPath, (req, res, ctx) => {
    return res(ctx.json<SignUpResponse>(mockedUser), ctx.delay(ms(DEFAULT_DELAY)));
  }),
  rest.post(createTweetPath, (req, res, ctx) => {
    return res(ctx.json<CreateTweetResponse>(mockedTweet), ctx.delay(ms(DEFAULT_DELAY)));
  })
];
