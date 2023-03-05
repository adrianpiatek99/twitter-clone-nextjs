import type { ReactNode, Ref } from "react";
import { forwardRef } from "react";
import { useRef } from "react";
import React from "react";

import { Loader } from "components/core";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import styled from "styled-components";

interface InfiniteScrollingSectionProps {
  children: ReactNode;
  flatDataCount: number;
  isFetching: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
  isError: boolean;
  errorMessage: string;
  emptyMessage: string;
  hasNextPage?: boolean;
  ariaLabel?: string;
}

export const InfiniteScrollingSection = forwardRef(
  (
    {
      children,
      flatDataCount,
      isFetching,
      isLoading,
      fetchNextPage,
      isError,
      emptyMessage,
      errorMessage,
      hasNextPage,
      ariaLabel
    }: InfiniteScrollingSectionProps,
    ref: Ref<HTMLDivElement>
  ) => {
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

    if (isError) {
      return <ErrorMessage title={errorMessage} />;
    }

    if (!isLoading && flatDataCount === 0) {
      return <EmptyMessage text={emptyMessage} />;
    }

    return (
      <Section aria-label={ariaLabel ?? ""} ref={ref}>
        {children}
        {isFetching && !isLoading && (
          <LoaderWrapper>
            <Loader center />
          </LoaderWrapper>
        )}
        {hasNextPage && !isLoading && <LoadMoreItems ref={lastItemRef} />}
      </Section>
    );
  }
);

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
