import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { IconButton } from "components/core";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

type EditProfileModalIconButtonProps = ComponentPropsWithoutRef<typeof IconButton>;

export const EditProfileModalIconButton = ({
  children,
  ...props
}: EditProfileModalIconButtonProps) => {
  return (
    <StyledIconButton color="white" size="large" {...props}>
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled(IconButton)`
  opacity: 0.85;
  background-color: ${({ theme }) => theme.dark150};
  backdrop-filter: blur(4px);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.dark150, 0.7)};
    }
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => hexToRGBA(theme.dark150, 0.75)};
  }

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.dark150, 0.7)};
  }
`;
