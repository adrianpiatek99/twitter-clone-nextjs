import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { UserData } from "api/user/userByScreenName";
import { AxiosError } from "axios";
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

  const { data, isLoading: userByScreenNameLoading, isError, error } = userByScreenNameQuery;
  const errorMessage = error?.message;

  return { data, userByScreenNameLoading, isError, error, errorMessage };
};
