import { useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteScrollQueryProps<TRequest, TResponse> {
  queryKey: string[];
  queryFn: (props: TRequest) => Promise<TResponse>;
}

export const useInfiniteScrollQuery = <
  TRequest extends { cursor?: string | null | undefined },
  TResponse extends { nextCursor: string | undefined },
  TData
>({
  queryKey,
  queryFn
}: UseInfiniteScrollQueryProps<TRequest, TResponse>) => {
  const { data: queryData, ...restData } = useInfiniteQuery<TResponse>({
    queryKey: [...queryKey, "infinite"],
    getNextPageParam: lastPage => lastPage.nextCursor,
    queryFn: ({ pageParam }) => queryFn({ cursor: pageParam } as TRequest)
  });
  const data: TData[] = queryData?.pages.flatMap(page => page[queryKey[0]]) ?? [];
  const observer = useRef<IntersectionObserver>(null!);
  const observerOptions = {
    threshold: 0
  };

  function lastItemRef(node: HTMLDivElement) {
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
  }

  return { data, queryData, lastItemRef, ...restData };
};
