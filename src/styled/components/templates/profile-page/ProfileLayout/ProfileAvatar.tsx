import React from "react";

import { Avatar } from "shared/Avatar";
import styled from "styled-components";

interface ProfileAvatarProps {
  src: string;
  isLoading: boolean;
}

export const ProfileAvatar = ({ src, isLoading }: ProfileAvatarProps) => {
  return (
    <Wrapper>
      <div style={{ paddingBottom: "100%" }} />
      <Inner>
        <StyledAvatar loading={isLoading} src={src} />
      </Inner>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 24%;
  min-width: 48px;
  margin-top: -15%;
  margin-bottom: 12px;
`;

const Inner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  display: grid;
  place-items: center;
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
`;

const StyledAvatar = styled(Avatar)`
  box-shadow: rgba(255, 255, 255, 0.03) 0px 0px 2px inset;
  height: 100%;
  width: 100%;
  background-color: rgb(45, 49, 51);
`;
