import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import styled from "styled-components";

import { LogoSize, logoSizeVariants } from "./logoStyleVariants";

interface LogoProps {
  size?: LogoSize;
}

export const Logo = ({ size = "s" }: LogoProps) => {
  return <LogoIcon size={size} />;
};

const LogoIcon = styled(TwitterIcon)<{ size: LogoSize }>`
  &&& {
    fill: ${({ theme }) => theme.logo};

    ${({ size }) => logoSizeVariants[size]}
  }
`;
