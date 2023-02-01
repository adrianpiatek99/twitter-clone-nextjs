import type { Follow, User } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { UserFollower } from "./userByScreenName";

export type FollowingRequest = {
  screenName: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type Follower = Pick<User, "id" | "name" | "profileImageUrl" | "screenName" | "description">;

export type FollowerData = Follow & {
  follower: Follower & UserFollower;
  user: Follower & UserFollower;
};

export type FollowingResponse = {
  following: Omit<FollowerData, "user">[];
  nextCursor: string | undefined;
};

export const followingPath = "/api/user/following";

const handler: NextApiHandler<FollowingResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const { screenName, cursor, limit } = req.query as FollowingRequest;
    const userId = session?.user?.id;
    const queryLimit = limit ? parseInt(limit) : 20;
    const prismaCursor = cursor ? { id: cursor } : undefined;

    const following = await prisma.follow.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      where: {
        user: {
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

    if (!following) {
      return res
        .status(404)
        .send({ error: "Something went wrong then trying to fetch following list." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (following.length > queryLimit) {
      const nextItem = following.pop() as typeof following[number];

      nextCursor = nextItem.id;
    }

    return res.status(200).json({ following, nextCursor });
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
