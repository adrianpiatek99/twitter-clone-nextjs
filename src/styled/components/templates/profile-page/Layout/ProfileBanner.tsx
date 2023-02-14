import React, { memo } from "react";

import Image from "next/legacy/image";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

interface ProfileBannerProps {
  src: string;
  isLoading: boolean;
}

export const ProfileBanner = memo(({ src, isLoading }: ProfileBannerProps) => {
  return (
    <Wrapper isLoading={isLoading}>
      <Inner>
        {isLoading ? (
          <Skeleton absolute withoutRadius />
        ) : (
          src && <Image priority src={src} objectFit="cover" layout="fill" alt="Profile banner" />
        )}
      </Inner>
    </Wrapper>
  );
});

const Wrapper = styled.div<{ isLoading: boolean }>`
  display: block;
  background-color: ${({ isLoading }) => !isLoading && "rgb(47, 51, 54)"};
  overflow: hidden;
`;

const Inner = styled.div`
  position: relative;
  display: block;
  padding-bottom: 33.3333%;
  width: 100%;
`;
