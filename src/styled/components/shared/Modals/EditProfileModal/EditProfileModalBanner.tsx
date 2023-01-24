import React from "react";

import CameraPlusIcon from "icons/CameraPlusIcon";
import CloseIcon from "icons/CloseIcon";
import styled from "styled-components";

import { EditProfileModalIconButton } from "./EditProfileModalIconButton";

interface EditProfileModalBannerProps {
  src: string;
  isLoading: boolean;
}

export const EditProfileModalBanner = ({ src }: EditProfileModalBannerProps) => {
  return (
    <Wrapper isLoading>
      <Inner>
        <BannerImage src={src} />
      </Inner>
      <ButtonsWrapper>
        <EditProfileModalIconButton title="Add photo">
          <CameraPlusIcon />
        </EditProfileModalIconButton>
        <EditProfileModalIconButton title="Remove photo">
          <CloseIcon />
        </EditProfileModalIconButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  margin: 0 2px;
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
