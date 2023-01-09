import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { NextApiHandler } from "next";
import { exclude, prisma } from "prisma/prisma";

export type SignUpRequest = Pick<User, "screen_name" | "name" | "email" | "password"> & {
  repeat_password: string;
};

export type SignUpResponse = {
  user?: Omit<User, "password">;
  message?: string;
};

export const signUpPath = "/api/auth/signUp";

const handler: NextApiHandler<SignUpResponse> = async (req, res) => {
  const { method, body } = req;
  const reqBody = body as SignUpRequest;

  switch (method) {
    case "POST":
      {
        try {
          const { screen_name, name, email, password, repeat_password } = reqBody;

          const existingEmail = await prisma.user.findUnique({ where: { email } });
          const existingScreenName = await prisma.user.findUnique({ where: { screen_name } });

          if (existingScreenName) {
            return res.status(404).json({ message: "Screen name is already in use." });
          }

          if (existingEmail || password !== repeat_password) {
            return res.status(404).json({ message: "We cannot create account. Try again." });
          }

          const createdUser = await prisma.user.create({
            data: {
              screen_name,
              name,
              email,
              password: await hashSync(password, 12)
            }
          });
          const userWithoutPassword = exclude(createdUser, ["password"]);

          res.status(201).json({ user: userWithoutPassword });
        } catch (error) {
          res.status(400).json({ message: (error as any).message });
        }
      }
      break;
    default:
      res.status(500);
      break;
  }
};

export default handler;
