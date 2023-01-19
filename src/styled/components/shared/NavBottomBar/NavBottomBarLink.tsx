import React from "react";

import { IconButton } from "components/core";
import styled from "styled-components";

import { NavBottomBarItem } from "./navBottomBarHelpers";

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
    <TabIconButton aria-label={text} color="white" href={href} disableFocus={active}>
      {active ? <ActiveIcon /> : <Icon />}
    </TabIconButton>
  );
};

const TabIconButton = styled(IconButton)`
  min-width: 46px;
  min-height: 46px;

  & > svg {
    width: 26px;
    height: 26px;
  }
`;
