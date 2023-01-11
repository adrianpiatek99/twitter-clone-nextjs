import { useSession } from "next-auth/react";

export const useAppSession = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const isUnauthenticated = status === "unauthenticated";

  return {
    session,
    isSessionLoading: isLoading,
    isAuthenticated,
    isUnauthenticated
  };
};
