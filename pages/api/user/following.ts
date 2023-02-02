import type { Follows, User } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { FollowedBy } from "./userByScreenName";

export type FollowUser = Pick<
  User,
  "id" | "name" | "profileImageUrl" | "screenName" | "description"
> &
  FollowedBy;

export type FollowingData = Follows & {
  following: FollowUser;
};

export type FollowingRequest = {
  screenName: string;
  cursor?: string | null | undefined;
  limit?: string;
};

export type FollowingResponse = {
  following: Omit<FollowingData, "follower">[];
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

    const following = await prisma.follows.findMany({
      orderBy: [{ createdAt: "desc" }],
      take: queryLimit + 1,
      cursor: prismaCursor,
      where: {
        follower: {
          screenName
        }
      },
      include: {
        following: {
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
