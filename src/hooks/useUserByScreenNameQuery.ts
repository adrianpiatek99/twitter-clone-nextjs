import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { UserData } from "api/user/userByScreenName";
import type { AxiosError } from "axios";
import { userByScreenName } from "network/user/userByScreenName";

interface UseUserByScreenNameQueryProps {
  queryScreenName: string;
  enabled?: boolean;
}

export const useUserByScreenNameQuery = ({
  queryScreenName,
  enabled = true
}: UseUserByScreenNameQueryProps) => {
  const [isQueryError, setIsQueryError] = useState(false);
  const userByScreenNameQuery = useQuery<UserData, AxiosError>({
    queryKey: ["user", queryScreenName],
    queryFn: () => userByScreenName({ screenName: queryScreenName }),
    onError: () => {
      setIsQueryError(true);
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: !isQueryError
  });

  const userByScreenNameLoading = userByScreenNameQuery.isLoading;

  return { userByScreenNameLoading, ...userByScreenNameQuery };
};
