import React, { FC } from "react";

import { ButtonBase } from "@mui/material";
import { IconButton } from "components/core";
import Link from "next/link";
import styled, { css, useTheme } from "styled-components";
import { hexToRGBA } from "utils/colors";

import { NavDrawerItem } from "./navDrawerHelpers";

interface NavDrawerLinkProps extends NavDrawerItem {
  active: boolean;
}

export const NavDrawerLink: FC<NavDrawerLinkProps> = ({ text, href, active, ...props }) => {
  const { neutral20 } = useTheme();

  const getCorrectIcon = () => {
    return active ? <props.activeIcon /> : <props.icon />;
  };

  return (
    <NavItem>
      <StyledLink href={href} tabIndex={-1}>
        <NavIconButton title={text} color={neutral20}>
          {getCorrectIcon()}
        </NavIconButton>
        <NavLinkContent $active={active}>
          {getCorrectIcon()}
          <span>{text}</span>
        </NavLinkContent>
      </StyledLink>
    </NavItem>
  );
};

const NavItem = styled.li`
  display: flex;
  width: max-content;
  margin: 0px;
  padding: 0px;

  @media ${({ theme }) => theme.breakpoints.xl} {
    width: 100%;
  }
`;

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

const NavLinkContent = styled(ButtonBase)<{ $active: boolean }>`
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
        width: 26px;
        height: 26px;
      }

      ${({ $active }) =>
        $active &&
        css`
          font-weight: 700;
        `}
    }
  }
`;

const NavIconButton = styled(IconButton)`
  &&& {
    padding: 12px;

    & > div > svg {
      width: 26px;
      height: 26px;
    }

    @media ${({ theme }) => theme.breakpoints.xl} {
      display: none;
    }
  }
`;
