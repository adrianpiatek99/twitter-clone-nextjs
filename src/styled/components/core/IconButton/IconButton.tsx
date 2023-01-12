import React, { ComponentPropsWithRef, FC, ReactElement, Ref } from "react";
import { forwardRef } from "react";

import Tooltip from "@mui/material/Tooltip";
import styled, { css, useTheme } from "styled-components";

import { getIconButtonColor, IconButtonColor } from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<"button">, "color"> {
  children: ReactElement;
  title?: string;
  color?: IconButtonColor;
  isError?: boolean;
  disableFocus?: boolean;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    { children, title, color = "primary", isError = false, disableFocus = false, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, neutral00, error10 } = useTheme();

    const getSpecificColor = (color: IconButtonColor) => {
      if (isError) return error10;

      if (color === "primary") return primary05;

      if (color === "secondary") return neutral00;

      return color;
    };

    const renderIconButton = () => {
      return (
        <IconButtonElement
          tabIndex={disableFocus ? -1 : 0}
          $color={getSpecificColor(color)}
          $isError={isError}
          {...props}
          ref={ref}
        >
          {children}
        </IconButtonElement>
      );
    };

    return title ? (
      <Tooltip title={title} disableInteractive enterNextDelay={150}>
        {renderIconButton()}
      </Tooltip>
    ) : (
      renderIconButton()
    );
  }
);

const IconButtonElement = styled.button<
  Omit<IconButtonProps, "title"> & { $color: string; $isError: boolean }
>`
  &&& {
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
    background-color: transparent;
    cursor: pointer;
    transition: 0.2s ease;

    & > svg {
      width: 20px;
      height: 20px;
      transition: 0.2s ease;
    }

    ${({ $color }) => getIconButtonColor($color)}

    ${({ $isError }) =>
      $isError &&
      css`
        cursor: default;

        &:active:not(:disabled) {
          transform: none;
        }
      `}
  }
`;
