import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

import type { UserData } from "./userByScreenName";

export type EditProfileRequest = Pick<
  UserData,
  "name" | "description" | "url" | "profileImageUrl" | "profileBannerUrl"
>;

export type EditProfileResponse = Omit<UserData, "_count">;

export const editProfilePath = "/api/user/editProfile";

const handler: NextApiHandler<EditProfileResponse | NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "PATCH") {
    const userId = session.user.id;
    const body = req.body as EditProfileRequest;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ...body
      }
    });

    return res.status(200).json(updatedUser);
  }

  res.status(400).send({ error: "Bad request." });
};

export default handler;
