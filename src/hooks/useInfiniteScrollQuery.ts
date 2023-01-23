import { useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type Params<T> = Omit<T, "cursor">;

interface UseInfiniteScrollQueryProps<TRequest, TResponse> {
  queryKey: string[];
  queryFn: (props: TRequest) => Promise<TResponse>;
  params?: Params<TRequest>;
}

export const useInfiniteScrollQuery = <
  TRequest extends { cursor?: string | null | undefined },
  TResponse extends { nextCursor: string | undefined },
  TData
>({
  queryKey,
  queryFn,
  params
}: UseInfiniteScrollQueryProps<TRequest, TResponse>) => {
  const { data: queryData, ...restData } = useInfiniteQuery<TResponse, AxiosError, TRequest>({
    queryKey: [...queryKey, "infinite"],
    getNextPageParam: lastPage => lastPage.nextCursor,
    queryFn: ({ pageParam }) => queryFn({ ...params, cursor: pageParam } as TRequest)
  });
  const data: TData[] = queryData?.pages.flatMap(page => page[queryKey[0]]) ?? [];
  const observer = useRef<IntersectionObserver>(null!);
  const observerOptions = {
    threshold: 0
  };

  const lastItemRef = (node: HTMLDivElement) => {
    const { isFetching, hasNextPage, fetchNextPage } = restData;

    if (isFetching || !hasNextPage || !window.IntersectionObserver) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, observerOptions);

    if (node) {
      observer.current.observe(node);
    }
  };

  return { data, queryData, lastItemRef, ...restData };
};
