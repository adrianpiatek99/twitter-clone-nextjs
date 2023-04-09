import type { ComponentPropsWithoutRef, FC, ReactElement, ReactNode } from "react";
import React, { cloneElement } from "react";

import { LinearProgress } from "components/core";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

interface TopBarProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  loading?: boolean;
}

export const TopBar: FC<TopBarProps> = ({ children, startIcon, endIcon, loading, ...props }) => {
  return (
    <Wrapper {...props}>
      {startIcon && <StartIcon>{cloneElement(startIcon)}</StartIcon>}
      {children}
      {endIcon && <EndIcon>{cloneElement(endIcon)}</EndIcon>}
      {loading && <LinearProgress />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px 30px;
  height: 53px;
  background-color: ${({ theme }) => hexToRGBA(theme.background, 0.65)};
  backdrop-filter: blur(12px);
  max-width: 1000px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  z-index: 100;
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
`;
