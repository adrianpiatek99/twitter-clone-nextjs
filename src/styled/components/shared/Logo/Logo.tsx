import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import styled from "styled-components";

import { LogoColor, logoColors, LogoSize, logoSizeVariants } from "./logoStyleVariants";

interface LogoProps {
  color?: LogoColor;
  size?: LogoSize;
}

export const Logo = ({ size = "s", color = "primary" }: LogoProps) => {
  return <LogoIcon size={size} color={color} />;
};

const LogoIcon = styled(TwitterIcon)<LogoProps>`
  &&& {
    ${({ color }) => logoColors[color ?? "primary"]}
    ${({ size }) => logoSizeVariants[size ?? "s"]}
  }
`;
