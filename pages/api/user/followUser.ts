import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type FollowUserRequest = {
  followerId: string;
};

export const followUserPath = "/api/user/followUser";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "POST") {
    const { followerId } = req.body as FollowUserRequest;
    const userId = session.user.id;

    const follow = await prisma.follow.create({
      data: {
        follower: {
          connect: {
            id: followerId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    if (!follow) {
      return res.status(404).send({ error: "Something went wrong then trying to follow user." });
    }

    return res.status(200).end();
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
