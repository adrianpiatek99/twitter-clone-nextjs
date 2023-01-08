import React, { FC } from "react";

import styled, { css } from "styled-components";

interface LoginBackgroundGifProps {
  withBlur?: boolean;
}

const imageUrl =
  "https://media2.giphy.com/media/26BRxIdjE82KNmVJm/giphy.gif?cid=790b761178f0259baf56aa0208c3d583676741defea1081b&rid=giphy.gif&ct=g";

export const LoginBackgroundGif: FC<LoginBackgroundGifProps> = ({ withBlur = false }) => {
  return (
    <ImageWrapper withBlur={withBlur}>
      <img alt="dfg" src={imageUrl} draggable="false" />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div<{ withBlur: boolean }>`
  position: absolute;
  inset: 0px;
  overflow: hidden;
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
`;
