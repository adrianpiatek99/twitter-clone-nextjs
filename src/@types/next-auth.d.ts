// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: Omit<User, "password"> & DefaultSession["user"];
    expires?: string;
  }
}
