import React from "react";

import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

export const ProfileSkeleton = () => {
  return (
    <>
      <SkeletonNamesRow>
        <Skeleton width={140} height={22} />
        <Skeleton width={125} height={20} />
      </SkeletonNamesRow>
      <SkeletonDescriptionRow>
        <Skeleton height={15} />
        <Skeleton width={275} height={15} />
      </SkeletonDescriptionRow>
      <SkeletonInfoAndLinksRow>
        <Skeleton width={125} height={15} />
        <Skeleton width={100} height={15} />
        <Skeleton width={100} height={15} />
        <Skeleton width={100} height={15} />
        <Skeleton width={100} height={15} />
      </SkeletonInfoAndLinksRow>
      <SkeletonFollowsRow>
        <Skeleton height={14} width={80} />
        <Skeleton height={14} width={80} />
      </SkeletonFollowsRow>
    </>
  );
};

const SkeletonNamesRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const SkeletonDescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SkeletonInfoAndLinksRow = styled.div`
  display: inline;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.neutral300};

  & > div {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    margin-right: 11px;
    overflow-wrap: break-word;
    line-height: 18px;
    color: inherit;
  }
`;

const SkeletonFollowsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
`;
