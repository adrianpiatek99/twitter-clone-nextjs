import type { Like } from "@prisma/client";
import type { TweetData } from "api/tweet/timelineTweets";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type LikedTweetData = Like & { tweet: TweetData };

export type LikedTweetsRequest = {
  userId: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type LikedTweetsResponse = {
  likedTweets: LikedTweetData[];
  nextCursor: string | undefined;
};

export const likedTweetsPath = "/api/tweet/likedTweets";

const handler: NextApiHandler<LikedTweetsResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const sessionUserId = session?.user?.id;
    const { cursor, limit, userId } = req.query as LikedTweetsRequest;
    const queryLimit = limit ? parseInt(limit) : 20;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const likedTweets = await prisma.like.findMany({
      where: {
        userId
      },
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      include: {
        tweet: {
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
        }
      }
    });

    if (!likedTweets) {
      return res.status(404).send({ error: "Can't fetch tweets." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (likedTweets.length > queryLimit) {
      const nextItem = likedTweets.pop() as typeof likedTweets[number];

      nextCursor = nextItem.id;
    }

    return res.status(200).json({ likedTweets, nextCursor });
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
