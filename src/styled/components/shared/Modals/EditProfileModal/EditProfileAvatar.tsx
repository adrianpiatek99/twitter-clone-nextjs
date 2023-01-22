import React from "react";

import CameraPlusIcon from "icons/CameraPlusIcon";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";

import { EditProfileModalIconButton } from "./EditProfileModalIconButton";

interface EditProfileAvatarProps {
  src: string;
}

export const EditProfileAvatar = ({ src }: EditProfileAvatarProps) => {
  return (
    <Wrapper>
      <div style={{ paddingBottom: "100%" }} />
      <Inner>
        <StyledAvatar src={src} disableFocus />
      </Inner>
      <ButtonsWrapper>
        <EditProfileModalIconButton title="Add photo">
          <CameraPlusIcon />
        </EditProfileModalIconButton>
      </ButtonsWrapper>
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
`;

const Inner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;

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
  height: 100%;
  width: 100%;
  background-color: rgb(45, 49, 51);
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 25px;
`;
