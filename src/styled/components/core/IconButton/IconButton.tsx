import React, { ComponentPropsWithRef, FC, forwardRef, ReactNode, Ref, useMemo } from "react";

import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import styled, { css, useTheme } from "styled-components";

import {
  getIconButtonColor,
  IconButtonColor,
  IconButtonSize,
  iconButtonSizeVariants
} from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "color"> {
  children: ReactNode;
  title?: string;
  size?: IconButtonSize;
  color?: IconButtonColor;
  isError?: boolean;
  disableFocus?: boolean;
  href?: string;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    {
      children,
      title = "",
      size = "medium",
      color = "primary",
      isError = false,
      disableFocus = false,
      href,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, white, neutral300, error40 } = useTheme();

    const specificColor = useMemo((): [string, string] => {
      if (isError) return [error40, error40];

      if (color === "primary") return [primary05, primary05];

      if (color === "secondary") return [neutral300, primary05];

      if (color === "white") return [white, white];

      return [neutral300, color];
    }, [isError, color]);

    const sharedProps = {
      $color: specificColor,
      tabIndex: disableFocus ? -1 : 0,
      size
    };

    return (
      <Tooltip title={title} disableInteractive enterNextDelay={150}>
        {href ? (
          <StyledLink href={href} {...sharedProps} {...(props as typeof Link)}>
            {children}
          </StyledLink>
        ) : (
          <IconButtonElement type="button" $isError={isError} {...sharedProps} {...props} ref={ref}>
            {children}
          </IconButtonElement>
        )}
      </Tooltip>
    );
  }
);

const sharedStyles = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.2s;

  & > svg {
    transition: 0.2s;
  }
`;

const StyledLink = styled(Link)<IconButtonProps & { $color: [string, string] }>`
  ${sharedStyles}

  ${({ $color }) => getIconButtonColor($color)};
  ${({ size }) => iconButtonSizeVariants[size || "medium"]};
`;

const IconButtonElement = styled.button<
  IconButtonProps & { $color: [string, string]; $isError: boolean }
>`
  ${sharedStyles}

  ${({ $color }) => getIconButtonColor($color)};
  ${({ size }) => iconButtonSizeVariants[size || "medium"]};

  ${({ $isError }) =>
    $isError &&
    css`
      cursor: default;

      &:active:not(:disabled) {
        transform: none;
      }
    `}
`;
