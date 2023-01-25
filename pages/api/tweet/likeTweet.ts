import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type LikeTweetRequest = {
  tweetId: string;
};

export const likeTweetPath = "api/tweet/likeTweet";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const body = req.body as LikeTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "POST") {
    const userId = session.user.id;
    const { tweetId } = body;

    const like = await prisma.like.create({
      data: {
        tweet: {
          connect: {
            id: tweetId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    if (!like) {
      return res.status(404).send({ error: "Something went wrong then trying to like tweet." });
    }

    return res.status(200).end();
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
