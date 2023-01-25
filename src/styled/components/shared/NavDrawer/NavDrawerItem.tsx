import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { Button } from "components/core";
import styled from "styled-components";

import type { NavDrawerItemType } from "./navDrawerItemsHelper";

type NavDrawerItemProps = NavDrawerItemType & ComponentPropsWithoutRef<typeof Button>;

export const NavDrawerItem = ({ text, icon: Icon, ...props }: NavDrawerItemProps) => {
  return (
    <li>
      <NavDrawerButton
        startIcon={<Icon />}
        color="secondary"
        variant="text"
        size="extraLarge"
        fullWidth
        {...props}
      >
        {text}
      </NavDrawerButton>
    </li>
  );
};

const NavDrawerButton = styled(Button)`
  justify-content: flex-start;
  padding: 0 24px;
  font-weight: 700;

  & > svg {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
`;
