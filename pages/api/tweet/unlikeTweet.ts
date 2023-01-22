import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import { TweetData } from "./timelineTweets";

export type UnlikeTweetRequest = {
  tweetId: TweetData["id"];
};

export const unlikeTweetPath = "api/tweet/unlikeTweet";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const query = req.query as UnlikeTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "DELETE") {
    const userId = session.user.id;
    const { tweetId } = query;

    const unlike = await prisma.like.delete({
      where: {
        tweetId_userId: {
          tweetId,
          userId
        }
      }
    });

    if (!unlike) {
      return res.status(404).send({ error: "Something went wrong then trying to unlike tweet." });
    }

    res.status(200).end();
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
