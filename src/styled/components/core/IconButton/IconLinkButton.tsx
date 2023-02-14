import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React, { useMemo } from "react";

import Link from "next/link";
import styled, { useTheme } from "styled-components";

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
  const { primary05, white, neutral300 } = useTheme();

  const iconButtonColors = useMemo((): [string, string] => {
    if (color === "primary") return [primary05, primary05];

    if (color === "secondary") return [neutral300, primary05];

    if (color === "white") return [white, white];

    return [neutral300, color];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <Tooltip content={title}>
      <LinkElement
        aria-label={title}
        href={href}
        size={size}
        $color={iconButtonColors}
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
