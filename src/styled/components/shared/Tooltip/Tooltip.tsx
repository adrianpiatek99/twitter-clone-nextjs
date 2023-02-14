import "tippy.js/dist/tippy.css";

import type { ComponentPropsWithoutRef, ReactElement } from "react";
import React from "react";

import Tippy from "@tippyjs/react";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

interface TooltipProps extends Omit<ComponentPropsWithoutRef<typeof Tippy>, "theme"> {
  children: ReactElement;
  content: string;
}

export const Tooltip = ({ children, content, ...props }: TooltipProps) => {
  return content ? (
    <TippyWrapper
      hideOnClick
      content={content}
      arrow={false}
      touch={["hold", 200]}
      placement="bottom"
      delay={[200, 0]}
      offset={[0, 7]}
      {...props}
    >
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
