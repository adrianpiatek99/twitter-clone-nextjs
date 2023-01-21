import { Like, Tweet, User } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

type TweetLike = { likes: Pick<Like, "userId">[] };

type TweetAuthor = { author: Pick<User, "id" | "name" | "screenName" | "profileImageUrl"> };

type TweetCount = { _count: { likes: number } };

export type TweetData = Tweet & TweetAuthor & TweetLike & TweetCount;

export type TimelineTweetsRequest = {
  cursor?: string | null | undefined;
  limit?: string;
};

export type TimelineTweetsResponse = { tweets: TweetData[]; nextCursor: string | undefined };

export const timelineTweetsPath = "/api/tweet/timelineTweets";

const handler: NextApiHandler<TimelineTweetsResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const query = req.query as TimelineTweetsRequest;

  if (req.method === "GET") {
    const userId = session?.user?.id;
    const { cursor, limit } = query;
    const queryLimit = limit ? parseInt(limit) : 15;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const tweets = await prisma.tweet.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      include: {
        likes: {
          where: { userId },
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
            likes: true
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
  } else {
    res.status(400).send({ error: "Bad request." });
  }
};

export default handler;
