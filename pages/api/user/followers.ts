import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { FollowerData } from "./following";

export type FollowersRequest = {
  screenName: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type FollowersResponse = {
  followers: Omit<FollowerData, "follower">[];
  nextCursor: string | undefined;
};

export const followersPath = "/api/user/followers";

const handler: NextApiHandler<FollowersResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const { screenName, cursor, limit } = req.query as FollowersRequest;
    const userId = session?.user?.id;
    const queryLimit = limit ? parseInt(limit) : 20;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const followers = await prisma.follow.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      where: {
        follower: {
          screenName
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            screenName: true,
            description: true,
            profileImageUrl: true,
            followers: {
              where: { userId },
              select: {
                userId: true
              }
            }
          }
        }
      }
    });

    if (!followers) {
      return res
        .status(404)
        .send({ error: "Something went wrong then trying to fetch followers list." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (followers.length > queryLimit) {
      const nextItem = followers.pop() as typeof followers[number];

      nextCursor = nextItem.id;
    }

    return res.status(200).json({ followers, nextCursor });
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
