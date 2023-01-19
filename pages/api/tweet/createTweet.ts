import { Tweet } from "@prisma/client";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type CreateTweetRequest = Pick<Tweet, "text" | "imageUrls">;
export type CreateTweetResponse = Tweet;

export const createTweetPath = "/api/tweet/createTweet";

const handler: NextApiHandler<CreateTweetResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });
  const { method } = req;
  const body = req.body as CreateTweetRequest;

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (method === "POST") {
    const { text, imageUrls } = body;
    const textTrim = text.trim();
    const userId = session.user.id;

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
      }
    });

    res.status(201).json(tweet);
  } else {
    res.status(400).send({ error: "Bad request." });
  }
};

export default handler;
