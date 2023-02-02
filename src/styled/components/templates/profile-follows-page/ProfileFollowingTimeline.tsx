import React from "react";

import type { FollowingData, FollowingRequest, FollowingResponse } from "api/user/following";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { following } from "network/user/following";
import type { ProfileFollowingPageProps } from "pages/[screenName]/following";
import { ErrorMessage } from "shared/ErrorMessage";
import styled from "styled-components";

import { FollowCell, FollowCellSkeleton } from "./FollowCell";

type ProfileFollowingTimelineProps = ProfileFollowingPageProps;

export const ProfileFollowingTimeline = ({ userData }: ProfileFollowingTimelineProps) => {
  const { screenName } = userData;
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<FollowingRequest, FollowingResponse, FollowingData>({
      queryKey: ["following", screenName],
      queryFn: following,
      params: {
        screenName
      }
    });
  const { items, measureElement, totalSize } = useVirtualScroll(data, 100);
  const skeletons = Array(7)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <FollowingSection>
      {isLoading ? (
        skeletons.map(skeleton => <FollowCellSkeleton key={skeleton} />)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const follow = data[index] as FollowingData;

            return (
              <FollowCell
                key={follow.id}
                data-index={index}
                ref={measureElement}
                start={start}
                followUser={follow.following}
              />
            );
          })}
        </div>
      )}
      {isFetching && !isLoading && (
        <LoaderWrapper additionalPadding>
          <Loader center />
        </LoaderWrapper>
      )}
      {hasNextPage && !isLoading && <LoadMoreItems ref={lastItemRef} />}
    </FollowingSection>
  );
};

const FollowingSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
`;

const LoaderWrapper = styled.div<{ additionalPadding?: boolean }>`
  margin: 30px 0;
  padding-bottom: ${({ additionalPadding }) => additionalPadding && "40px"};
`;

const LoadMoreItems = styled.div`
  position: absolute;
  bottom: 0px;
  height: 95vh;
  left: 0px;
  pointer-events: none;
`;
