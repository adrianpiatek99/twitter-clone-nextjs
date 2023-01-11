import React from "react";

import TwitterIcon from "@mui/icons-material/Twitter";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

export const HeaderLogo = () => {
  return (
    <LogoButton>
      <TwitterIcon />
    </LogoButton>
  );
};

const LogoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 2px;
  cursor: pointer;
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
