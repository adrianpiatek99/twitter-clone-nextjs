import React, { ComponentPropsWithRef, FC, ReactElement, Ref } from "react";
import { forwardRef } from "react";

import { IconButton as MuiIconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import styled, { css } from "styled-components";
import { hexToRGBA } from "utils/colors";

interface IconButtonProps extends ComponentPropsWithRef<typeof MuiIconButton> {
  children: ReactElement;
  title: string;
  disableFocus?: boolean;
  isError?: boolean;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = forwardRef(
  (
    { children, title, disableFocus = false, isError = false, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Tooltip title={title}>
        <IconButtonElement
          aria-label={title}
          tabIndex={disableFocus ? -1 : 0}
          disableRipple={isError}
          disableFocusRipple={isError}
          $isError={isError}
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
  Omit<IconButtonProps, "title"> & { $isError: boolean }
>`
  &&& {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 34px;
    min-height: 34px;
    width: max-content;
    color: ${({ theme }) => hexToRGBA(theme.primary05, 0.5)};
    padding: 0;
    border-radius: 50%;
    background-color: transparent;

    & > svg {
      fill: ${({ theme }) => theme.primary05};
      width: 20px;
      height: 20px;
    }

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.primary05, 0.1)};
    }

    ${({ $isError }) =>
      $isError &&
      css`
        color: ${({ theme }) => hexToRGBA(theme.error10, 0.5)};
        cursor: default;

        & > svg {
          fill: ${({ theme }) => theme.error10};
        }

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => hexToRGBA(theme.error10, 0.1)};
        }
      `}
  }
`;
