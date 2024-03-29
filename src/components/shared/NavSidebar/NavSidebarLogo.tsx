import React from "react";

import { HOME_PAGE_ROUTE } from "constants/routes";
import { TwitterIcon } from "icons/index";
import Link from "next/link";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

export const NavSidebarLogo = () => {
  return (
    <LogoLink href={HOME_PAGE_ROUTE} aria-label="Twitter">
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
    fill: ${({ theme }) => theme.neutral50};
    height: 28px;
    width: 28px;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.1)}`};
    }
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.1)}`};
  }

  &:active {
    background-color: ${({ theme }) => `${hexToRGBA(theme.primary05, 0.3)}`};
  }
`;
