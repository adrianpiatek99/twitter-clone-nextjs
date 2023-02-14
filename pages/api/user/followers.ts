import type { Follows } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { FollowUser } from "./following";

export type FollowersData = Follows & {
  follower: FollowUser;
};

export type FollowersRequest = {
  screenName: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type FollowersResponse = {
  followers: Omit<FollowersData, "following">[];
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

    const followers = await prisma.follows.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      where: {
        following: {
          screenName
        }
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            screenName: true,
            description: true,
            profileImageUrl: true,
            followedBy: {
              where: { followerId: userId },
              select: {
                followerId: true
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
