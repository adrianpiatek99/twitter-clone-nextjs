import type { Tweet } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { TweetData } from "./timelineTweets";

export type CreateTweetRequest = Pick<Tweet, "text" | "imageUrls">;
export type CreateTweetResponse = TweetData;

export const createTweetPath = "/api/tweet/createTweet";

const handler: NextApiHandler<CreateTweetResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const body = req.body as CreateTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "POST") {
    const { text, imageUrls } = body;
    const userId = session.user.id;
    const textTrim = text.trim();

    if (!textTrim || textTrim.length === 0) {
      return res.status(403).send({ error: "Tweet text is required." });
    }

    const tweet = await prisma.tweet.create({
      data: {
        text: textTrim,
        imageUrls,
        author: {
          connect: {
            id: userId
          }
        }
      },
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

    return res.status(201).json(tweet);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
