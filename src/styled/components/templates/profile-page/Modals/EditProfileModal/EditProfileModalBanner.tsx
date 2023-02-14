import type { ChangeEvent } from "react";
import { useRef } from "react";
import React from "react";

import { imageFileTypes } from "constants/fileTypes";
import CameraPlusIcon from "icons/CameraPlusIcon";
import CloseIcon from "icons/CloseIcon";
import Image from "next/image";
import styled from "styled-components";

import { EditProfileModalIconButton } from "./EditProfileModalIconButton";

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
      <Inner>{src && <Image src={src} fill alt={"Profile banner"} />}</Inner>
      <ButtonsWrapper>
        <EditProfileModalIconButton title="Add photo" onClick={handleFilePicker}>
          <CameraPlusIcon />
        </EditProfileModalIconButton>
        {src && (
          <EditProfileModalIconButton title="Remove photo" onClick={removeBannerPhoto}>
            <CloseIcon />
          </EditProfileModalIconButton>
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

  & > img {
    object-fit: cover;
  }

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
