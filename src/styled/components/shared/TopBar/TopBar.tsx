import React, { cloneElement, ComponentPropsWithoutRef, ReactElement } from "react";

import { LinearProgress } from "components/core";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

interface TopBarProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactElement | ReactElement[];
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  loading?: string;
}

export const TopBar = ({ children, startIcon, endIcon, loading, ...props }: TopBarProps) => {
  return (
    <Wrapper {...props}>
      {startIcon && <StartIcon>{cloneElement(startIcon)}</StartIcon>}
      {children}
      {endIcon && <EndIcon>{cloneElement(endIcon)}</EndIcon>}
      {loading && <LinearProgress position="bottom" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: -0px;
  display: flex;
  align-items: center;
  gap: 30px;
  height: 53px;
  background-color: ${({ theme }) => hexToRGBA(theme.background, 0.65)};
  backdrop-filter: blur(12px);
  max-width: 1000px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
`;

const StartIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: -8px;
`;

const EndIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: -8px;
  margin-left: auto;
`;
