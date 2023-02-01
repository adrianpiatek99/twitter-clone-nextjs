import type { Follow, User } from "@prisma/client";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { exclude, prisma } from "prisma/prisma";

type UserCount = {
  _count: { tweets: number; likes: number; following: number; followers: number };
};

export type UserFollower = { followers: Pick<Follow, "userId">[] };

export type UserData = Omit<User, "password" | "email"> & UserCount & UserFollower;

export type UserByScreenNameRequest = {
  screenName: User["screenName"];
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
        followers: {
          where: { userId },
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            tweets: true,
            likes: true,
            following: true,
            followers: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).send({ error: "User does not exist." });
    }

    const userWithoutSpecificFields = exclude(user, ["password", "email"]);

    return res.status(200).json(userWithoutSpecificFields);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
