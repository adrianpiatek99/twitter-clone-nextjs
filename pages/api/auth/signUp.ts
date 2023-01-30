import type { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import type { NextApiHandler } from "next";
import { exclude, prisma } from "prisma/prisma";
import {
  PROFILE_EMAIL_MAX_LENGTH,
  PROFILE_NAME_MAX_LENGTH,
  PROFILE_PASSWORD_MAX_LENGTH,
  PROFILE_SCREEN_NAME_MAX_LENGTH
} from "schema/authSchema";

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

    if (screenName.length > PROFILE_SCREEN_NAME_MAX_LENGTH) {
      return res.status(409).send({ error: "Username is too long." });
    }

    if (name.length > PROFILE_NAME_MAX_LENGTH) {
      return res.status(409).send({ error: "Name is too long." });
    }

    if (email.length > PROFILE_EMAIL_MAX_LENGTH) {
      return res.status(409).send({ error: "Email is too long." });
    }

    if (password.length > PROFILE_PASSWORD_MAX_LENGTH) {
      return res.status(409).send({ error: "Password is too long." });
    }

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

    return res.status(201).json(userWithoutPassword);
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
