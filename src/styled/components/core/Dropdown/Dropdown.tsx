import React, { ComponentPropsWithoutRef, FC, ReactElement } from "react";

import Menu from "@mui/material/Menu";
import styled from "styled-components";

export type DropdownAnchorEl = HTMLElement | null;

interface DropdownProps extends Omit<ComponentPropsWithoutRef<typeof Menu>, "open"> {
  children: ReactElement | ReactElement[];
  anchorEl: HTMLElement | null;
}

export const Dropdown: FC<DropdownProps> = ({ children, anchorEl, ...props }) => {
  const isOpen = !!anchorEl;

  return (
    <DropdownWrapper anchorEl={anchorEl} open={isOpen} {...props}>
      {children}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled(Menu)`
  &&& {
    & .MuiPaper-root {
      min-width: 125px;
      background-color: ${({ theme }) => theme.background2};
    }
  }
`;
