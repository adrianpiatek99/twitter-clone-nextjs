import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "prisma/prisma";

type Credentials = Record<"email" | "password", string> | undefined;

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
          throw new Error("Invalid credentials.");
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: "/"
  }
};

export default NextAuth(authOptions);
