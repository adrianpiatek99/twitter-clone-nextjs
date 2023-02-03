import React from "react";

import Image from "next/image";
import styled, { css } from "styled-components";

const IMAGE_URL =
  "https://media2.giphy.com/media/3oEjHREpGw73bnR7Ow/giphy.gif?cid=ecf05e47rxmkjsxcti8xmyopot15mx7ksisqfo9hms38cckh&rid=giphy.gif&ct=g";

interface LoginBackgroundImageProps {
  withBlur?: boolean;
}

export const LoginBackgroundImage = ({ withBlur = false }: LoginBackgroundImageProps) => {
  return (
    <ImageWrapper withBlur={withBlur}>
      <Image
        alt="Default background image"
        loader={() => IMAGE_URL}
        src={IMAGE_URL}
        fill
        draggable="false"
      />
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
