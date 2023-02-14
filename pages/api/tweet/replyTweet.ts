import type { TweetReply, User } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { TweetData } from "./timelineTweets";

type ReplyAuthor = { author: Pick<User, "id" | "name" | "screenName" | "profileImageUrl"> };

export type ReplyData = TweetReply &
  ReplyAuthor & {
    tweet: { author: TweetData["author"] };
  };

export type ReplyTweetRequest = {
  tweetId: string;
  text: string;
};

export type ReplyTweetResponse = ReplyData;

export const replyTweetPath = "/api/tweet/replyTweet";

const handler: NextApiHandler<ReplyTweetResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "POST") {
    const { tweetId, text } = req.body as ReplyTweetRequest;
    const userId = session.user.id;
    const textTrim = text.trim();

    if (!textTrim || textTrim.length === 0) {
      return res.status(403).send({ error: "Reply text is required." });
    }

    const reply = await prisma.tweetReply.create({
      data: {
        text: textTrim,
        tweet: {
          connect: {
            id: tweetId
          }
        },
        author: {
          connect: {
            id: userId
          }
        }
      },
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

    if (!reply) {
      return res.status(404).send({ error: "Something went wrong then trying to reply tweet." });
    }

    return res.status(201).json(reply);
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
