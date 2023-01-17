import React, { ComponentPropsWithoutRef } from "react";

import TwitterIcon from "icons/TwitterIcon";
import styled from "styled-components";

import { LogoColor, logoColors, LogoSize, logoSizeVariants } from "./logoStyleVariants";

interface LogoProps extends ComponentPropsWithoutRef<typeof TwitterIcon> {
  color?: LogoColor;
  size?: LogoSize;
}

export const Logo = ({ size = "s", color = "primary", ...props }: LogoProps) => {
  return <LogoIcon {...props} size={size} color={color} />;
};

const LogoIcon = styled(TwitterIcon)<LogoProps>`
  ${({ color }) => logoColors[color ?? "primary"]}
  ${({ size }) => logoSizeVariants[size ?? "s"]}
`;
