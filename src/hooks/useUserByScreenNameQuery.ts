import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { UserData } from "api/user/userByScreenName";
import type { AxiosError } from "axios";
import { userByScreenName } from "network/user/userByScreenName";
import { useRouter } from "next/router";
import { verifyMe } from "utils/session";

import { useAppSession } from "./useAppSession";

interface UseUserByScreenNameQueryProps {
  enabled?: boolean;
}

export const useUserByScreenNameQuery = ({ enabled = true }: UseUserByScreenNameQueryProps) => {
  const { query } = useRouter();
  const { session, isSessionLoading } = useAppSession();
  const [isQueryError, setIsQueryError] = useState(false);
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const itsMe = verifyMe(session, queryScreenName);
  const { data, isLoading, isError, error } = useQuery<UserData, AxiosError>({
    queryKey: ["user", queryScreenName],
    queryFn: () => userByScreenName({ screenName: queryScreenName }),
    onError: () => {
      setIsQueryError(true);
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: !isQueryError
  });
  const userLoading = itsMe ? isSessionLoading : isLoading;
  const userData = itsMe ? session?.user : data;

  return { userData, userLoading, isError, itsMe, queryScreenName, error };
};
