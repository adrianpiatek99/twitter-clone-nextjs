import type { TweetData } from "api/tweet/timelineTweets";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type UserTweetsRequest = {
  userId: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type UserTweetsResponse = {
  tweets: TweetData[];
  nextCursor: string | undefined;
};

export const userTweetsPath = "/api/tweet/userTweets";

export const handler: NextApiHandler<UserTweetsResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const sessionUserId = session?.user?.id;
    const { cursor, limit, userId } = req.query as UserTweetsRequest;
    const queryLimit = limit ? parseInt(limit) : 20;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const tweets = await prisma.tweet.findMany({
      where: {
        authorId: userId
      },
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      include: {
        likes: {
          where: { userId: sessionUserId },
          select: {
            userId: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            screenName: true,
            profileImageUrl: true
          }
        },
        _count: {
          select: {
            likes: true,
            replies: true
          }
        }
      }
    });

    if (!tweets) {
      return res.status(404).send({ error: "Can't fetch tweets." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (tweets.length > queryLimit) {
      const nextItem = tweets.pop() as typeof tweets[number];

      nextCursor = nextItem.id;
    }

    return res.status(200).json({ tweets, nextCursor });
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
