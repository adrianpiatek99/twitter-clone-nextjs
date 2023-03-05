import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";

import Link from "next/link";
import styled from "styled-components";

import { Tooltip } from "..";
import type { IconButtonColor, IconButtonElementProps, IconButtonSize } from "./iconButtonVariants";
import { generalIconButtonStyles } from "./iconButtonVariants";

interface IconLinkButtonProps extends ComponentPropsWithoutRef<"a"> {
  children: ReactNode;
  href: string;
  title?: string;
  disableFocus?: boolean;
  size?: IconButtonSize;
  color?: IconButtonColor;
}

export const IconLinkButton = ({
  children,
  href,
  title = "",
  disableFocus = false,
  size = "medium",
  color = "primary",
  ...props
}: IconLinkButtonProps) => {
  return (
    <Tooltip content={title}>
      <LinkElement
        aria-label={title}
        href={href}
        size={size}
        color={color}
        tabIndex={disableFocus ? -1 : 0}
        {...props}
      >
        {children}
      </LinkElement>
    </Tooltip>
  );
};

const LinkElement = styled(Link)<IconButtonElementProps>`
  ${generalIconButtonStyles};
`;
