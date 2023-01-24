import React from "react";

import { IconLinkButton } from "components/core";
import styled from "styled-components";

import type { NavBottomBarItem } from "./navBottomBarHelpers";

interface NavBottomBarLinkProps extends NavBottomBarItem {
  active: boolean;
}

export const NavBottomBarLink = ({
  text,
  href,
  active,
  icon: Icon,
  activeIcon: ActiveIcon
}: NavBottomBarLinkProps) => {
  return (
    <TabIconLinkButton aria-label={text} color="white" href={href} disableFocus={active}>
      {active ? <ActiveIcon /> : <Icon />}
    </TabIconLinkButton>
  );
};

const TabIconLinkButton = styled(IconLinkButton)`
  min-width: 46px;
  min-height: 46px;

  &:active:not(:disabled) {
    background-color: transparent;
    transform: scale(0.8);
  }

  & > svg {
    width: 26px;
    height: 26px;
  }
`;
