import React from "react";

import Image from "next/image";
import styled, { css } from "styled-components";
import type { TweetData } from "types/tweet";
import { calcPaddingAspectRatio } from "utils/aspectRatio";

interface TweetCellMediaProps {
  media: TweetData["media"];
}

export const TweetCellMedia = ({ media }: TweetCellMediaProps) => {
  const width = media[0]?.width ?? 0;
  const height = media[0]?.height ?? 0;
  const paddingAspectRatio = calcPaddingAspectRatio(width, height);

  return (
    <Wrapper style={{ paddingBottom: media.length >= 2 ? "56.25%" : `${paddingAspectRatio}%` }}>
      <Absolute>
        <Images mediaCount={media.length}>
          {media.map(({ url }) => (
            <ImageWrapper key={url}>
              <Image fill src={url} alt={url} />
            </ImageWrapper>
          ))}
        </Images>
      </Absolute>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  overflow: hidden;
`;

const Absolute = styled.div`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
`;

const Images = styled.div<{ mediaCount: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ mediaCount }) => `repeat(${mediaCount >= 4 ? 2 : mediaCount}, 1fr)`};
  gap: 2px;
  width: 100%;
  height: 100%;

  ${({ mediaCount }) =>
    mediaCount === 3 &&
    css`
      grid-template-columns: none;

      & div:nth-child(1) {
        grid-column: 1;
        grid-row: 1 / 3;
      }
      & div:nth-child(2) {
        grid-row: 1 / span;
        grid-column: 2;
      }
      & div:nth-child(3) {
        grid-row: 1 / span;
        grid-column: 2;
      }
    `}
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & > img {
    object-fit: cover;
  }

  & > button {
    position: absolute;
    top: 4px;
    left: 4px;
    cursor: pointer;
  }
`;
