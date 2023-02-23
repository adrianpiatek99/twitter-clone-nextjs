import { router } from "../trpc";
import { authRouter } from "./auth";
import { tweetRouter } from "./tweet";
import { tweetReplyRouter } from "./tweetReply";
import { userRouter } from "./user";

export const appRouter = router({
  auth: authRouter,
  tweet: tweetRouter,
  tweetReply: tweetReplyRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
