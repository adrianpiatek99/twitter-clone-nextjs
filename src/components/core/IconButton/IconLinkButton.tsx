import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";

import { Tooltip } from "components/core";
import type { LinkProps } from "next/link";
import Link from "next/link";
import styled from "styled-components";

import type { IconButtonColor, IconButtonElementProps, IconButtonSize } from "./iconButtonVariants";
import { generalIconButtonStyles } from "./iconButtonVariants";

interface IconLinkButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  children: ReactNode;
  href: LinkProps["href"];
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
