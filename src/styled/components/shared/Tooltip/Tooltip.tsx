import "tippy.js/dist/tippy.css";

import type { ReactElement } from "react";
import React from "react";

import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

interface TooltipProps {
  children: ReactElement;
  content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return content ? (
    <TippyWrapper content={content} arrow={false} placement="bottom" delay={[200, 0]}>
      {children}
    </TippyWrapper>
  ) : (
    children
  );
};

const TippyWrapper = styled(Tippy)`
  background-color: ${({ theme }) => hexToRGBA(theme.gray500, 0.9)};
  color: ${({ theme }) => theme.neutral50};
  line-height: 11px;
  font-size: 11px;
`;
