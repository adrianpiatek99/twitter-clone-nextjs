import React from "react";

import styled, { css, keyframes } from "styled-components";
import { hexToRGBA } from "utils/colors";

type Position = "top" | "bottom";
interface LinearProgressProps {
  position?: Position;
}

export const LinearProgress = ({ position = "top" }: LinearProgressProps) => {
  return <ProgressElement position={position} />;
};

const progressLinearAnimate = keyframes`
  0% {
    background-size: 200% 100%;
    background-position: left -31.25% top 0%;
  }
  50% {
    background-size: 800% 100%;
    background-position: left -49% top 0%;
  }
  100% {
    background-size: 400% 100%;
    background-position: left -102% top 0%;
  }
`;

const ProgressElement = styled.progress<LinearProgressProps>`
  position: absolute;
  top: 0px;
  left: 0.5px;
  right: 0.5px;
  height: 3px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  color: ${({ theme }) => theme.primary05};
  background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.5)}`};

  &::-webkit-progress-bar {
    background-color: transparent;
  }

  &::-webkit-progress-value {
    background-color: currentColor;
    transition: all 0.2s;
  }

  &::-moz-progress-bar {
    background-color: currentColor;
    transition: all 0.2s;
  }

  &::-ms-fill {
    border: none;
    background-color: currentColor;
    transition: all 0.2s;
  }

  &:indeterminate {
    background-size: 200% 100%;
    background-image: linear-gradient(
      to right,
      transparent 50%,
      currentColor 50%,
      currentColor 60%,
      transparent 60%,
      transparent 71.5%,
      currentColor 71.5%,
      currentColor 84%,
      transparent 84%
    );
    animation: ${progressLinearAnimate} 2s infinite linear;
  }

  &:indeterminate::-moz-progress-bar {
    background-color: transparent;
  }

  &:indeterminate::-ms-fill {
    animation-name: none;
  }

  ${({ position }) =>
    position === "bottom" &&
    css`
      top: auto;
      bottom: 0px;
    `}
`;
