import type { Follows, User } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { exclude, prisma } from "prisma/prisma";

type UserCount = {
  _count: { tweets: number; likes: number; followedBy: number; following: number };
};

export type FollowedBy = { followedBy: Pick<Follows, "followerId">[] };

export type UserData = Omit<User, "password" | "email"> & UserCount & FollowedBy;

export type UserByScreenNameRequest = {
  screenName: string;
};

export type UserByScreenNameResponse = UserData;

export const userByScreenNamePath = "/api/user/userByScreenName";

const handler: NextApiHandler<UserByScreenNameResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const userId = session?.user?.id;
    const { screenName } = req.query as UserByScreenNameRequest;

    const user = await prisma.user.findFirst({
      where: { screenName: { equals: screenName, mode: "insensitive" } },
      include: {
        followedBy: {
          where: { followerId: userId },
          select: {
            followerId: true
          }
        },
        _count: {
          select: {
            tweets: true,
            likes: true,
            followedBy: true,
            following: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).send({ error: "This account doesn’t exist" });
    }

    const userWithoutSpecificFields = exclude(user, ["password", "email"]);

    return res.status(200).json(userWithoutSpecificFields);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
