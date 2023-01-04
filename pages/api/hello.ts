import { Tweet } from "@prisma/client";
import { NextApiHandler } from "next";
import prisma from "prisma/prisma";

export type GetTweetsResponse = {
  tweets: Tweet[];
  message?: string;
};

export const path = "/api/tweet/getTweets";

export const getTweets: NextApiHandler<GetTweetsResponse> = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      {
        try {
          const tweets = await prisma.tweet.findMany();

          res.json({ tweets });
        } catch (error) {
          res.status(400).json({ tweets: [], message: "Error!!!" });
        }
      }
      break;
    default:
      res.status(500).json({ tweets: [], message: "Error!!!" });
      break;
  }
};

export default getTweets;
