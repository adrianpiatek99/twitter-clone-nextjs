import type { ChangeEvent } from "react";
import React, { useRef } from "react";

import { imageFileTypes } from "constants/fileTypes";
import { CameraPlusIcon } from "icons/index";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";

import { EditProfileModalIconButton } from "./EditProfileModalIconButton";

interface EditProfileModalAvatarProps {
  src: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditProfileModalAvatar = ({ src, onFileChange }: EditProfileModalAvatarProps) => {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleFilePicker = () => filePickerRef.current?.click();

  return (
    <Wrapper>
      <Inner>
        <StyledAvatar src={src} absolute disableFocus />
      </Inner>
      <ButtonsWrapper>
        <EditProfileModalIconButton title="Add photo" onClick={handleFilePicker}>
          <CameraPlusIcon />
        </EditProfileModalIconButton>
      </ButtonsWrapper>
      <input
        aria-label="Profile avatar picker"
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
  max-width: 110px;
  background-color: ${({ theme }) => theme.background};
  margin-top: -8%;
  margin-bottom: 1px;
  width: 24%;
  border-radius: 50%;

  &::before {
    content: "";
    padding-bottom: 100%;
  }
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};

  &::before {
    content: "";
    position: absolute;
    inset: 0px;
    transform: translate(-2px, -2px);
    border-radius: 50%;
    height: calc(100% + 4px);
    width: calc(100% + 4px);
    border: 2px solid ${({ theme }) => theme.background};
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
`;

const StyledAvatar = styled(Avatar)`
  box-shadow: rgba(255, 255, 255, 0.03) 0px 0px 2px inset;
  background-color: rgb(45, 49, 51);
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 25px;
`;
