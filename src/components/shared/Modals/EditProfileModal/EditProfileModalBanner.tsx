import type { ChangeEvent } from "react";
import { useRef } from "react";
import React from "react";

import { IconButton } from "components/core";
import { imageFileTypes } from "constants/fileTypes";
import { CameraPlusIcon, CloseIcon } from "icons/index";
import Image from "next/legacy/image";
import styled from "styled-components";

interface EditProfileModalBannerProps {
  src: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeBannerPhoto: () => void;
}

export const EditProfileModalBanner = ({
  src,
  onFileChange,
  removeBannerPhoto
}: EditProfileModalBannerProps) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleFilePicker = () => filePickerRef.current?.click();

  return (
    <Wrapper>
      <Inner>
        {src && <Image priority src={src} objectFit="cover" layout="fill" alt="Profile banner" />}
      </Inner>
      <ButtonsWrapper>
        <IconButton title="Add photo" size="large" color="dark" onClick={handleFilePicker}>
          <CameraPlusIcon />
        </IconButton>
        {src && (
          <IconButton title="Remove photo" size="large" color="dark" onClick={removeBannerPhoto}>
            <CloseIcon />
          </IconButton>
        )}
      </ButtonsWrapper>
      <input
        aria-label="Profile banner picker"
        ref={filePickerRef}
        type="file"
        onChange={onFileChange}
        hidden
        accept={imageFileTypes.toString()}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  margin: 0 2px;
  background-color: rgb(47, 51, 54);
  overflow: hidden;
`;

const Inner = styled.div`
  position: relative;
  display: block;
  padding-bottom: 33.3333%;
  width: 100%;

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 25px;
`;
