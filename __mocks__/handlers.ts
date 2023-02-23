import { rest } from "msw";
import { mockedTweet } from "./tweet.mock";
import { mockedUser } from "./user.mock";

const ms = (duration: number) => {
  return process.env.APP_ENV === "testing" ? 0 : duration;
};

const DEFAULT_DELAY = 1000 * 2;

export const apiMockHandlers = [
  rest.post("/api/trpc/auth/signUp", (req, res, ctx) => {
    return res(ctx.json(mockedUser), ctx.delay(ms(DEFAULT_DELAY)));
  }),
  rest.post("/api/trpc/tweet/create", (req, res, ctx) => {
    return res(ctx.json(mockedTweet), ctx.delay(ms(DEFAULT_DELAY)));
  })
];
