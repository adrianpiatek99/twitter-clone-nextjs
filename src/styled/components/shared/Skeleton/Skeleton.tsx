import React from "react";

import styled, { css, keyframes } from "styled-components";

type SkeletonVariant = "rect" | "circular";

interface SkeletonProps {
  height?: number;
  width?: number;
  variant?: SkeletonVariant;
  isAbsolute?: boolean;
  withoutRadius?: boolean;
}

export const Skeleton = ({
  height,
  width,
  variant = "rect",
  isAbsolute = false,
  withoutRadius = false
}: SkeletonProps) => {
  return (
    <Container
      height={height}
      width={width}
      variant={variant}
      isAbsolute={isAbsolute}
      withoutRadius={withoutRadius}
    >
      <Swipe />
    </Container>
  );
};

const swipeAnimation = keyframes`
   0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
`;

const Container = styled.div<SkeletonProps>`
  position: relative;
  inset: none;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${({ variant }) => (variant === "circular" ? "50%" : "16px")};
  overflow: hidden;

  ${({ isAbsolute }) =>
    isAbsolute &&
    css`
      position: absolute;
      inset: 0px;
    `}

  ${({ withoutRadius }) =>
    withoutRadius &&
    css`
      border-radius: 0px;
    `}
`;

const Swipe = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
  background-repeat: no-repeat;
  height: 100%;
  animation: ${swipeAnimation} 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;
