import type { FC } from "react";
import React from "react";

import Image from "next/image";
import styled, { css } from "styled-components";

interface DefaultBackgroundGifProps {
  withBlur?: boolean;
}

const imageUrl =
  "https://media2.giphy.com/media/3oEjHREpGw73bnR7Ow/giphy.gif?cid=ecf05e47rxmkjsxcti8xmyopot15mx7ksisqfo9hms38cckh&rid=giphy.gif&ct=g";

export const DefaultBackgroundGif: FC<DefaultBackgroundGifProps> = ({ withBlur = false }) => {
  return (
    <ImageWrapper withBlur={withBlur}>
      <Image
        alt="Default background image"
        loader={() => imageUrl}
        src={imageUrl}
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
