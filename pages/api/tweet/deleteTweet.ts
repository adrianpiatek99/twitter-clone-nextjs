import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import { TweetData } from "./timelineTweets";

export type DeleteTweetRequest = {
  tweetId: TweetData["id"];
};

export const deleteTweetPath = "api/tweet/deleteTweet";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const query = req.query as DeleteTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "DELETE") {
    const userId = session.user.id;
    const { tweetId } = query;

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

    res.status(200).end();
  } else {
    res.status(400).send({ error: "Bad request." });
  }
};

export default handler;