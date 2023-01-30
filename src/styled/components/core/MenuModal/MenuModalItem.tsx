import React, { type ComponentPropsWithoutRef } from "react";

import styled from "styled-components";

import { Button } from "../Button";

interface MenuModalItemProps extends ComponentPropsWithoutRef<typeof Button> {
  children: string;
  onClick?: () => void;
  loading?: boolean;
}

export const MenuModalItem = ({ children, onClick, ...props }: MenuModalItemProps) => {
  return (
    <MenuButton onClick={onClick} variant="text" textAlign="left" color="secondary" {...props}>
      {children}
    </MenuButton>
  );
};

const MenuButton = styled(Button)`
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-of-type {
    border-bottom: none;
  }
`;
