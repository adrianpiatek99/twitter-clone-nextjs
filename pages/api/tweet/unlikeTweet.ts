import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type UnlikeTweetRequest = {
  tweetId: string;
};

export const unlikeTweetPath = "api/tweet/unlikeTweet";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const { method } = req;
  const query = req.query as UnlikeTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (method === "DELETE") {
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
  } else {
    res.status(400).send({ error: "Bad request." });
  }
};

export default handler;
