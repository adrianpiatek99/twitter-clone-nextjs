import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { NextApiHandler } from "next";
import { exclude, prisma } from "prisma/prisma";

export type SignUpRequest = Pick<User, "screenName" | "name" | "email" | "password"> & {
  repeatPassword: string;
};

export type SignUpResponse = Omit<User, "password">;

export const signUpPath = "/api/auth/signUp";

const handler: NextApiHandler<SignUpResponse | NextApiError> = async (req, res) => {
  const body = req.body as SignUpRequest;

  if (req.method === "POST") {
    const { screenName, name, email, password, repeatPassword } = body;
    const emailWithLowerCase = email.toLowerCase();

    const existingEmail = await prisma.user.findUnique({
      where: { email: emailWithLowerCase }
    });
    const existingScreenName = await prisma.user.findFirst({
      where: { screenName: { equals: screenName, mode: "insensitive" } }
    });

    if (existingScreenName) {
      return res.status(404).send({ error: "Screen name is already in use." });
    }

    if (existingEmail || password !== repeatPassword) {
      return res.status(404).send({ error: "We cannot create account. Try again." });
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
      return res.status(404).send({ error: "Failed to create new user." });
    }

    const userWithoutPassword = exclude(createdUser, ["password"]);

    res.status(201).json(userWithoutPassword);
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
