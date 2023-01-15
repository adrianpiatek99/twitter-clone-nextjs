// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: Omit<User, "password">;
    expires: string;
  }
}
