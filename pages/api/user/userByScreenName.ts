import { User } from "@prisma/client";
import { NextApiHandler } from "next";
import { exclude, prisma } from "prisma/prisma";

type UserCount = { _count: { tweets: number } };

export type UserData = Omit<User, "password"> & UserCount;

export type UserByScreenNameRequest = {
  screenName: User["screenName"];
};

export type UserByScreenNameResponse = UserData;

export const userByScreenNamePath = "/api/user/userByScreenName";

const handler: NextApiHandler<UserByScreenNameResponse | NextApiError> = async (req, res) => {
  if (req.method === "GET") {
    const { screenName } = req.query as UserByScreenNameRequest;

    const user = await prisma.user.findUnique({
      where: { screenName },
      include: {
        _count: {
          select: {
            tweets: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).send({ error: "User does not exist." });
    }

    const userWithoutPassword = exclude(user, ["password"]);

    return res.status(200).json(userWithoutPassword);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
