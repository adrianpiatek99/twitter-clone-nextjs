import type { NextApiHandler } from "next";
import { prisma } from "prisma/prisma";

import type { ReplyData } from "./replyTweet";

export type RepliesTweetRequest = {
  tweetId: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type RepliesTweetResponse = {
  replies: ReplyData[];
  nextCursor: string | undefined;
};

export const repliesTweetPath = "/api/tweet/repliesTweet";

export const handler: NextApiHandler<RepliesTweetResponse | NextApiError> = async (req, res) => {
  if (req.method === "GET") {
    const { tweetId, cursor, limit } = req.query as RepliesTweetRequest;
    const queryLimit = limit ? parseInt(limit) : 20;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const replies = await prisma.tweetReply.findMany({
      where: {
        tweetId
      },
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            screenName: true,
            profileImageUrl: true
          }
        },
        tweet: {
          select: {
            author: {
              select: {
                id: true,
                name: true,
                screenName: true,
                profileImageUrl: true
              }
            }
          }
        }
      }
    });

    if (!replies) {
      return res.status(404).send({ error: "Can't fetch replies." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (replies.length > queryLimit) {
      const nextItem = replies.pop() as typeof replies[number];

      nextCursor = nextItem.id;
    }

    return res.status(200).json({ replies, nextCursor });
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
