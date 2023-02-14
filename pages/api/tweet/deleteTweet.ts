import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type DeleteTweetRequest = {
  tweetId: string;
};

export const deleteTweetPath = "/api/tweet/deleteTweet";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "DELETE") {
    const { tweetId } = req.query as DeleteTweetRequest;
    const userId = session.user.id;

    const deletedTweet = await prisma.tweet.delete({
      where: {
        id_authorId: {
          id: tweetId,
          authorId: userId
        }
      }
    });

    if (!deletedTweet) {
      return res.status(404).send({ error: "Something went wrong then trying to delete tweet." });
    }

    return res.status(200).end();
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
