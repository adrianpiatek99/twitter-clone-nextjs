import { useRef } from "react";

interface UseInfiniteScrollHelpersProps {
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

export const useInfiniteScrollHelpers = ({
  isFetching,
  hasNextPage,
  fetchNextPage
}: UseInfiniteScrollHelpersProps) => {
  const observer = useRef<IntersectionObserver>(null!);
  const observerOptions = {
    threshold: 0
  };

  const lastItemRef = (node: HTMLDivElement) => {
    if (isFetching || !hasNextPage || !window.IntersectionObserver) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries?.[0]?.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, observerOptions);

    if (node) {
      observer.current.observe(node);
    }
  };

  return { lastItemRef };
};
