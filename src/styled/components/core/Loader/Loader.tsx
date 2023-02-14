import React from "react";

import styled, { keyframes } from "styled-components";
import { hexToRGBA } from "utils/colors";

interface LoaderProps {
  center?: boolean;
  color?: "primary" | "secondary";
}

export const Loader = ({ color, center }: LoaderProps) => {
  return <Spinner color={color ?? "primary"} center={center} />;
};

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<LoaderProps>`
  display: flex;
  font-size: 2.5px;
  position: relative;
  text-indent: -9999em;
  border-top: ${({ color, theme }) =>
    color === "primary"
      ? `1.5em solid ${hexToRGBA(theme.primary05, 0.25)}`
      : `1.5em solid rgb(217, 217, 217)`};
  border-right: ${({ color, theme }) =>
    color === "primary"
      ? `1.5em solid ${hexToRGBA(theme.primary05, 0.25)}`
      : `1.5em solid rgb(217, 217, 217)`};
  border-bottom: ${({ color, theme }) =>
    color === "primary"
      ? `1.5em solid ${hexToRGBA(theme.primary05, 0.25)}`
      : `1.5em solid rgb(217, 217, 217)`};
  border-left: ${({ color, theme }) =>
    color === "primary" ? `1.5em solid ${theme.primary05}}` : `1.5em solid rgb(110, 118, 125)`};
  transform: translateZ(0);
  animation: ${spinnerAnimation} 0.7s infinite linear;
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: ${({ center }) => center && "0 auto"};

  &::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
`;
