import { TRPCError } from "@trpc/server";
import { hashSync } from "bcryptjs";
import { exclude } from "prisma/prisma";
import { signUpSchema } from "schema/authSchema";

import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  signUp: publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { screenName, name, email, password, repeatPassword } = input;
    const emailWithLowerCase = email.toLowerCase();

    const existingEmail = await prisma.user.findUnique({
      where: { email: emailWithLowerCase }
    });
    const existingScreenName = await prisma.user.findFirst({
      where: { screenName: { equals: screenName, mode: "insensitive" } }
    });

    if (existingScreenName) {
      throw new TRPCError({ code: "CONFLICT", message: "Screen name is already in use." });
    }

    if (existingEmail || password !== repeatPassword) {
      throw new TRPCError({ code: "CONFLICT", message: "We cannot create account. Try again." });
    }

    const hashedPassword = hashSync(password, 12);

    const createdUser = await prisma.user.create({
      data: {
        screenName,
        name,
        email: emailWithLowerCase,
        password: hashedPassword
      }
    });

    if (!createdUser) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Failed to create new user." });
    }

    const userWithoutPassword = exclude(createdUser, ["password"]);

    return userWithoutPassword;
  })
});
