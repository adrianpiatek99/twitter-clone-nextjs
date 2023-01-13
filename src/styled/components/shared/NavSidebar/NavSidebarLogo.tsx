import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import Link from "next/link";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

export const NavSidebarLogo = () => {
  return (
    <LogoLink href="/home">
      <TwitterIcon />
    </LogoLink>
  );
};

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-top: 2px;
  border-radius: 50%;
  transition: 0.2s;

  & > svg {
    fill: ${({ theme }) => theme.neutral20};
    height: 32.5px;
    width: 50px;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.1)}`};
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.focus.primary} 0px 0px 0px 2px;
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.1)}`};
  }

  &:active {
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.3)}`};
  }
`;
