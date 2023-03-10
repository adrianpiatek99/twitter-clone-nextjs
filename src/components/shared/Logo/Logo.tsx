import React from "react";

import { TwitterIcon } from "icons/index";
import styled from "styled-components";

import type { LogoColor, LogoSize } from "./logoStyleVariants";
import { logoColors, logoSizeVariants } from "./logoStyleVariants";

interface LogoProps {
  color?: LogoColor;
  size?: LogoSize;
}

export const Logo = ({ size = "s", color = "primary", ...props }: LogoProps) => {
  return (
    <LogoWrapper size={size} color={color} {...props}>
      <TwitterIcon />
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div<LogoProps>`
  display: grid;
  place-items: center;

  & > svg {
    ${({ color }) => logoColors[color ?? "primary"]}
    ${({ size }) => logoSizeVariants[size ?? "s"]}
  }
`;
