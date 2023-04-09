import { useRouter } from "next/router";
import { api } from "utils/api";
import { verifyMe } from "utils/session";

import { useAppSession } from "./useAppSession";

interface UseUserByScreenNameQueryProps {
  enabled?: boolean;
}

export const useUserByScreenNameQuery = ({ enabled = true }: UseUserByScreenNameQueryProps) => {
  const { query } = useRouter();
  const { session, isSessionLoading } = useAppSession();
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const itsMe = verifyMe(session, queryScreenName);
  const { data, isLoading, isError, error } = api.user.byScreenName.useQuery(
    { screenName: queryScreenName },
    {
      enabled,
      retry: false,
      refetchOnWindowFocus: false
    }
  );
  const userLoading = itsMe ? isSessionLoading : isLoading;
  const userData = itsMe ? session?.user : data;

  return { userData, userLoading, isError, itsMe, queryScreenName, error };
};
