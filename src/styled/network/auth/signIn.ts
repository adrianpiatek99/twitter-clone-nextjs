import { SignInCredentials } from "api/auth/[...nextauth]";
import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = async (payload: SignInCredentials) => {
  return nextAuthSignIn("credentials", {
    ...payload,
    redirect: false
  });
};
