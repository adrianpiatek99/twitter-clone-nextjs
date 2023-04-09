import React from "react";

import { AUTH_PAGE_IMAGE_URL } from "constants/links";
import Image from "next/image";
import styled, { css } from "styled-components";

interface AuthBackgroundImageProps {
  withBlur?: boolean;
}

export const AuthBackgroundImage = ({ withBlur = false }: AuthBackgroundImageProps) => {
  return (
    <ImageWrapper withBlur={withBlur}>
      <Image alt="Default background image" src={AUTH_PAGE_IMAGE_URL} fill draggable="false" />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div<{ withBlur: boolean }>`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: absolute;
    inset: 0px;
    display: flex;
    z-index: -1;

    &::after {
      content: "";
      position: absolute;
      inset: 0px;
      background-color: rgba(0, 0, 0, 0.1);
    }

    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    ${({ withBlur }) =>
      withBlur &&
      css`
        filter: brightness(80%) blur(100px);
      `}
  }
`;
