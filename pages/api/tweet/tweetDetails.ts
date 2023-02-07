import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { TweetData } from "./timelineTweets";

export type TweetDetailsRequest = {
  screenName: string;
  tweetId: string;
};

export type TweetDetailsResponse = TweetData;

export const tweetDetailsPath = "/api/tweet/tweetDetails";

const handler: NextApiHandler<TweetDetailsResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const { screenName, tweetId } = req.query as TweetDetailsRequest;
    const userId = session?.user?.id;

    const tweet = await prisma.tweet.findFirst({
      where: {
        id: tweetId,
        author: {
          screenName
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
            likes: true,
            replies: true
          }
        }
      }
    });

    if (!tweet) {
      return res.status(404).send({ error: "This account doesn’t exist" });
    }

    return res.status(200).json(tweet);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
