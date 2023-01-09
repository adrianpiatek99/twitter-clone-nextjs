import React, { ComponentPropsWithRef, FC, ReactElement, Ref } from "react";
import { forwardRef } from "react";

import { IconButton as MuiIconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import styled, { css, useTheme } from "styled-components";

import { IconButtonColor, setIconButtonColor } from "./iconButtonVariants";

interface IconButtonProps extends Omit<ComponentPropsWithRef<typeof MuiIconButton>, "color"> {
  children: ReactElement;
  title: string;
  color?: IconButtonColor;
  disableFocus?: boolean;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    { children, title, color = "primary", disableFocus = false, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, neutral00, error10 } = useTheme();
    const isError = color === "error";

    const getSpecificColor = (color: IconButtonColor) => {
      if (color === "primary") return primary05;

      if (color === "secondary") return neutral00;

      if (color === "error") return error10;

      return color;
    };

    return (
      <Tooltip title={title}>
        <IconButtonElement
          aria-label={title}
          tabIndex={disableFocus ? -1 : 0}
          $color={getSpecificColor(color)}
          isError={isError}
          disableRipple={isError}
          disableFocusRipple={isError}
          {...props}
          ref={ref}
        >
          {children}
        </IconButtonElement>
      </Tooltip>
    );
  }
);

const IconButtonElement = styled(MuiIconButton)<
  Omit<IconButtonProps, "title"> & { $color: string; isError: boolean }
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
    background-color: transparent;

    & > svg {
      width: 20px;
      height: 20px;
    }

    ${({ $color }) => setIconButtonColor($color)}

    ${({ isError }) =>
      isError &&
      css`
        cursor: default;
      `}
  }
`;
