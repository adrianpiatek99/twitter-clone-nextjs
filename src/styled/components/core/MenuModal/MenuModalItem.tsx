import React, { ComponentPropsWithoutRef, FC } from "react";

import styled from "styled-components";

import { Button } from "../Button";

interface MenuModalItemProps extends ComponentPropsWithoutRef<typeof Button> {
  children: string;
  onClick?: () => void;
  loading?: boolean;
}

export const MenuModalItem: FC<MenuModalItemProps> = ({ children, onClick, ...props }) => {
  return (
    <MenuButton onClick={onClick} variant="text" color="secondary" {...props}>
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
