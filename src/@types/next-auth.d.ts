// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@prisma/client";

import type { UserData } from "./user";

declare module "next-auth" {
  interface Session {
    user: UserData & { email: string };
    expires: string;
  }
}
