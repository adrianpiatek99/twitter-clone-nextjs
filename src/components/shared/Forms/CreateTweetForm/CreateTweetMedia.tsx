import React, { memo, useEffect } from "react";

import { IconButton } from "components/core";
import { useCheckImageDimensions } from "hooks/useCheckImageDimensions";
import { CloseIcon } from "icons/index";
import Image from "next/image";
import type { TweetMediaFile } from "store/createTweetStore";
import styled, { css } from "styled-components";
import { calcPaddingAspectRatio } from "utils/aspectRatio";

interface CreateTweetMediaProps {
  tweetFiles: TweetMediaFile[];
  aspectRatio: number;
  isLoading: boolean;
  removeTweetFile: (filePreview: string) => void;
  setAspectRatio: (padding: number) => void;
}

export const CreateTweetMedia = memo(
  ({
    tweetFiles,
    aspectRatio,
    isLoading,
    removeTweetFile,
    setAspectRatio
  }: CreateTweetMediaProps) => {
    const firstFile = tweetFiles[0]?.file;
    const { width, height } = useCheckImageDimensions(firstFile);
    const firstFileAspectRatio = calcPaddingAspectRatio(width, height);
    const isTwoOrMoreImages = tweetFiles.length >= 2;

    useEffect(() => {
      if (firstFileAspectRatio) {
        setAspectRatio(firstFileAspectRatio);
      }
    }, [firstFileAspectRatio, setAspectRatio]);

    if (!aspectRatio && !isTwoOrMoreImages) return null;

    return (
      <Wrapper
        isLoading={isLoading}
        style={{ paddingBottom: isTwoOrMoreImages ? "56.25%" : `${aspectRatio}%` }}
      >
        <Absolute>
          <Images fileCount={tweetFiles.length}>
            {tweetFiles.map(({ file, preview }) => (
              <ImageWrapper key={preview} aria-label="Media">
                <Image fill src={URL.createObjectURL(file)} alt={file.name} />
                {!isLoading && (
                  <IconButton title="Remove" color="dark" onClick={() => removeTweetFile(preview)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </ImageWrapper>
            ))}
          </Images>
        </Absolute>
      </Wrapper>
    );
  }
);

const Wrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  opacity: ${({ isLoading }) => isLoading && 0.6};
  transition: opacity 0.2s;
`;

const Absolute = styled.div`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
`;

const Images = styled.div<{ fileCount: number }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({ fileCount }) => `repeat(${fileCount >= 4 ? 2 : fileCount}, 1fr)`};
  gap: 12px;
  width: 100%;
  height: 100%;

  ${({ fileCount }) =>
    fileCount === 3 &&
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
  border-radius: 16px;
  overflow: hidden;

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
