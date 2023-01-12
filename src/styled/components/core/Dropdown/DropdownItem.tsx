import React, { ComponentPropsWithoutRef, FC } from "react";

import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

interface DropdownItemProps extends ComponentPropsWithoutRef<typeof MenuItem> {
  loading?: boolean;
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, ...props }) => {
  return <Item {...props}>{children}</Item>;
};

const Item = styled(MenuItem)`
  &&& {
    color: ${({ theme }) => theme.neutral20};
    ${({ theme }) => theme.text.m};
    transition: background 0.2s;

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral20, 0.05)};
    }
  }
`;
