import type { ReactElement } from "react";
import { cloneElement, useRef } from "react";
import React from "react";

import type { InfiniteQueryObserverBaseResult } from "@tanstack/react-query";
import type { VirtualItem } from "@tanstack/react-virtual";
import { Loader } from "components/core";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import styled from "styled-components";

type ItemComponentProps = Pick<VirtualItem, "index">;

interface InfiniteVirtualScrollerProps<TData>
  extends Omit<InfiniteQueryObserverBaseResult, "data"> {
  data: TData[];
  itemComponent: ({ index }: ItemComponentProps) => ReactElement;
  loaderComponent: ReactElement;
  errorMessage: string;
  emptyMessage: string;
  ariaLabel?: string;
}

export const InfiniteVirtualScroller = <TData,>({
  data,
  itemComponent,
  loaderComponent,
  emptyMessage,
  errorMessage,
  ariaLabel,
  isLoading,
  isFetching,
  isError,
  fetchNextPage,
  hasNextPage
}: InfiniteVirtualScrollerProps<TData>) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null!);
  const observerOptions = {
    threshold: 0
  };
  const { items, measureElement, totalSize } = useVirtualScroll(data, parentRef);
  const isEmpty = !isLoading && data.length === 0;

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

  if (isError) {
    return <ErrorMessage title={errorMessage} />;
  }

  if (isEmpty) {
    return <EmptyMessage text={emptyMessage} />;
  }

  return (
    <Section aria-label={ariaLabel ?? ""} ref={parentRef}>
      {isLoading ? (
        cloneElement(loaderComponent)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ key, index, start }) => (
            <div
              key={key}
              className="animate-appear"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${start}px)`
              }}
            >
              {cloneElement(itemComponent({ index }), {
                ref: measureElement,
                "data-index": index
              })}
            </div>
          ))}
        </div>
      )}
      {isFetching && !isLoading && (
        <LoaderWrapper>
          <Loader center />
        </LoaderWrapper>
      )}
      {hasNextPage && !isLoading && <LoadMoreItems ref={lastItemRef} />}
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
`;

const LoaderWrapper = styled.div`
  margin: 30px 0;
  padding-bottom: 40px;
`;

const LoadMoreItems = styled.div`
  position: absolute;
  bottom: 0px;
  height: 95vh;
  left: 0px;
  pointer-events: none;
`;
