import React from "react";

import { IconButton } from "components/core";
import Link from "next/link";
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
    <Link href={href} tabIndex={-1}>
      <TabIconButton aria-label={text} color="secondary" disableFocus={active}>
        {active ? <ActiveIcon /> : <Icon />}
      </TabIconButton>
    </Link>
  );
};

const TabIconButton = styled(IconButton)`
  &&& {
    min-width: 46px;
    min-height: 46px;

    & > svg {
      width: 26px;
      height: 26px;
    }
  }
`;
