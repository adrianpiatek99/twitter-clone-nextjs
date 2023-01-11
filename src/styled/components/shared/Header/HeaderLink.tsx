import React, { FC } from "react";

import { ButtonBase } from "@mui/material";
import { IconButton } from "components/core";
import Link from "next/link";
import styled, { css, useTheme } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { HeaderNavItem } from "./headerHelpers";

interface HeaderLinkProps extends HeaderNavItem {
  active: boolean;
}

export const HeaderLink: FC<HeaderLinkProps> = ({ text, href, active, ...props }) => {
  const { neutral20 } = useTheme();

  const getCorrectIcon = () => {
    return active ? <props.activeIcon /> : <props.icon />;
  };

  return (
    <StyledLink href={href} tabIndex={-1}>
      <HeaderIconButton title={text} color={neutral20}>
        {getCorrectIcon()}
      </HeaderIconButton>
      <HeaderLinkContent $active={active}>
        {getCorrectIcon()}
        <span>{text}</span>
      </HeaderLinkContent>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: max-content;
  border-radius: 50px;

  &:hover:not(:disabled),
  &:focus-visible {
    text-decoration: none;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    width: 100%;
  }
`;

const HeaderLinkContent = styled(ButtonBase)<{ $active: boolean }>`
  &&& {
    display: none;

    @media ${({ theme }) => theme.breakpoints.xl} {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
      width: 100%;
      padding: 12px;
      border-radius: 50px;
      user-select: none;
      color: ${({ theme }) => theme.neutral20};
      font-family: ${({ theme }) => theme.fontFamily.primary};
      ${({ theme }) => theme.text.xl};
      transition: background-color 0.2s, box-shadow 0.2s;

      &:hover:not(:disabled),
      &:focus-visible {
        background-color: ${({ theme }) => hexToRGBA(theme.neutral00, 0.1)};
      }

      &:focus-visible {
        box-shadow: ${({ theme }) => theme.neutral20} 0px 0px 0px 2px;
      }

      & > svg {
        width: 26.25px;
        height: 26.25px;
      }

      ${({ $active }) =>
        $active &&
        css`
          font-weight: 700;
        `}
    }
  }
`;

const HeaderIconButton = styled(IconButton)`
  &&& {
    padding: 12px;

    & > div > svg {
      width: 26.25px;
      height: 26.25px;
    }

    @media ${({ theme }) => theme.breakpoints.xl} {
      display: none;
    }
  }
`;
