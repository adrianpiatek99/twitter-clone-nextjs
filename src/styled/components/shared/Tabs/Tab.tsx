import { useEffect, useRef } from "react";

import type { LinkProps } from "next/link";
import Link from "next/link";
import styled, { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

export interface TabProps {
  value: string;
  linkProps?: Omit<LinkProps, "as">;
}

export interface TabRestProps {
  onClick: () => void;
  selected: boolean;
}

export const Tab = ({ value, linkProps, ...props }: TabProps) => {
  const { selected, ...restProps } = props as TabRestProps;
  const tabLinkRef = useRef<HTMLAnchorElement>(null);
  const tabButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const current = tabLinkRef.current || tabButtonRef.current;

    if (selected && current) {
      current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selected]);

  if (linkProps) {
    return (
      <TabItemLink
        value={value}
        ref={tabLinkRef}
        selected={selected}
        draggable={false}
        tabIndex={selected ? 0 : -1}
        {...linkProps}
        {...restProps}
      >
        {value}
      </TabItemLink>
    );
  }

  return (
    <TabItemButton
      ref={tabButtonRef}
      value={value}
      selected={selected}
      tabIndex={selected ? 0 : -1}
      {...restProps}
    >
      {value}
    </TabItemButton>
  );
};

type SharedProps = { selected: boolean; value: string };

const selectedStyles = css`
  color: ${({ theme }) => theme.neutral50};
  background-color: ${({ theme }) => theme.background};
  pointer-events: none;
  cursor: default;

  &::after {
    transform: scaleX(1);
    transition: transform 0.2s;
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => `${theme.boxShadows.primary} inset`};
  }
`;

const sharedStyles = css<SharedProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.neutral300};
  padding: 0px 16px;
  white-space: nowrap;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  text-transform: capitalize;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, opacity 0.2s, box-shadow 0.2s;

  &::after {
    position: absolute;
    content: "";
    height: 3px;
    background-color: ${({ theme }) => theme.primary05};
    width: calc(100% - 30px);
    transform: scaleX(0);
    border-radius: 16px 16px 0 0;
    bottom: 0px;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.15)};
  }

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    box-shadow: ${({ theme }) => theme.boxShadows.secondary};
  }

  ${({ selected }) => selected && selectedStyles}
`;

const TabItemLink = styled(Link)<SharedProps>`
  width: 100%;
  text-decoration: none;
  ${sharedStyles};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      text-decoration: none;
    }
  }

  &:focus-visible {
    text-decoration: none;
  }
`;

const TabItemButton = styled.button<SharedProps>`
  ${sharedStyles};

  &:disabled {
    cursor: default;
  }
`;
