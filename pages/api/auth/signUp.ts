import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { NextApiHandler } from "next";
import { exclude, prisma } from "prisma/prisma";

export type SignUpRequest = Pick<User, "screenName" | "name" | "email" | "password"> & {
  repeatPassword: string;
};

export type SignUpResponse = Omit<User, "password">;

export const signUpPath = "/api/auth/signUp";

const handler: NextApiHandler<SignUpResponse | string> = async (req, res) => {
  const { method } = req;
  const body = req.body as SignUpRequest;

  if (method === "POST") {
    const { screenName, name, email, password, repeatPassword } = body;
    const emailWithLowerCase = email.toLowerCase();

    const existingEmail = await prisma.user.findUnique({
      where: { email: emailWithLowerCase }
    });
    const existingScreenName = await prisma.user.findUnique({
      where: { screenName: screenName.toLowerCase() }
    });

    if (existingScreenName) {
      return res.status(404).send("Screen name is already in use.");
    }

    if (existingEmail || password !== repeatPassword) {
      return res.status(404).send("We cannot create account. Try again.");
    }

    const createdUser = await prisma.user.create({
      data: {
        screenName,
        name,
        email: emailWithLowerCase,
        password: await hashSync(password, 12)
      }
    });

    if (!createdUser) {
      return res.status(404).send("Failed to create new user.");
    }

    const userWithoutPassword = exclude(createdUser, ["password"]);

    res.status(201).json(userWithoutPassword);
  } else {
    res.status(500);
  }
};

export default handler;
