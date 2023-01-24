import React, { ComponentPropsWithoutRef } from "react";

import styled, { css, keyframes } from "styled-components";

type SkeletonVariant = "rect" | "circular";

interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  height?: number;
  width?: number;
  variant?: SkeletonVariant;
  absolute?: boolean;
  withoutRadius?: boolean;
  transparent?: boolean;
}

export const Skeleton = ({
  height,
  width,
  variant = "rect",
  absolute = false,
  withoutRadius = false,
  transparent = false,
  ...props
}: SkeletonProps) => {
  return (
    <Container
      height={height}
      width={width}
      variant={variant}
      absolute={absolute}
      withoutRadius={withoutRadius}
      transparent={transparent}
      {...props}
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
  max-width: ${({ width }) => (width ? `${width}px` : "100%")};
  width: 100%;
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : "rgba(255, 255, 255, 0.1)"};
  border-radius: ${({ variant }) => (variant === "circular" ? "50%" : "16px")};
  overflow: hidden;

  ${({ absolute }) =>
    absolute &&
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
