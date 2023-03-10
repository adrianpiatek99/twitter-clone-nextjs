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
      <Inner>
        <StyledAvatar loading={isLoading} src={src} absolute />
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 24%;
  min-width: 48px;
  margin-top: -15%;
  margin-bottom: 12px;

  &::after {
    content: "";
    padding-bottom: 100%;
  }
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
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
  background-color: rgb(45, 49, 51);
`;
