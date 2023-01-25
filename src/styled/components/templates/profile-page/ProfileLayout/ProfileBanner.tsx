import React from "react";

import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

interface ProfileBannerProps {
  src: string;
  isLoading: boolean;
}

export const ProfileBanner = ({ src, isLoading }: ProfileBannerProps) => {
  return (
    <Wrapper isLoading={isLoading}>
      <Inner>{isLoading ? <Skeleton absolute withoutRadius /> : <BannerImage src={src} />}</Inner>
    </Wrapper>
  );
};

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

const BannerImage = styled.div<{ src: string }>`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
  background-image: ${({ src }) => `url(${src})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
