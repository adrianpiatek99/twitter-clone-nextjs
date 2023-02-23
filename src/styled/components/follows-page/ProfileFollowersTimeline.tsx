import React from "react";

import { Loader } from "components/core";
import { useInfiniteScrollHelpers } from "hooks/useInfiniteScrollHelpers";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { ErrorMessage } from "shared/Messages";
import styled from "styled-components";
import type { FollowUserData, UserData } from "types/user";
import { api } from "utils/api";

import { FollowCell, FollowCellSkeleton } from "./FollowCell";

type ProfileFollowersTimelineProps = {
  userData: UserData;
};

export const ProfileFollowersTimeline = ({
  userData: { screenName }
}: ProfileFollowersTimelineProps) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isError, error } =
    api.user.followers.useInfiniteQuery(
      { screenName },
      {
        getNextPageParam: lastPage => lastPage.nextCursor,
        retry: false
      }
    );
  const { lastItemRef } = useInfiniteScrollHelpers({ isFetching, hasNextPage, fetchNextPage });
  const flatData = data?.pages.flatMap(page => page["followers"]) ?? [];
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, 100);
  const skeletons = Array(7)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  return (
    <FollowersSection>
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
            const follow = flatData[index]?.follower as FollowUserData;

            return (
              <FollowCell
                key={follow.id}
                data-index={index}
                ref={measureElement}
                start={start}
                followUser={follow}
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
    </FollowersSection>
  );
};

const FollowersSection = styled.section`
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
