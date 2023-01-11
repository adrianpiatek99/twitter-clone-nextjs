// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      profile_image_url?: string | null;
    } & DefaultSession["user"] &
      Omit<User, "password">;
    expires?: string;
  }
}
