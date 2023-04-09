import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import React, { forwardRef } from "react";

import { Tooltip } from "components/core";
import styled, { css } from "styled-components";

import type { IconButtonColor, IconButtonElementProps } from "./iconButtonVariants";
import { generalIconButtonStyles, iconButtonSizeVariants } from "./iconButtonVariants";

interface IconLinkButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  label: string;
  title?: string;
  color?: IconButtonColor;
  customColor?: string;
  isSelected?: boolean;
  disableFocus?: boolean;
}

export const IconButtonWithLabel = forwardRef(
  (
    {
      children,
      label,
      title = "",
      color = "primary",
      customColor,
      isSelected = false,
      ...props
    }: IconLinkButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Tooltip content={title}>
        <ButtonElement
          aria-label={title}
          color={color}
          customColor={customColor}
          isSelected={isSelected}
          size="medium"
          {...props}
          ref={ref}
          after={Number(label) ? label : ""}
        >
          <IconWrapper>{children}</IconWrapper>
        </ButtonElement>
      </Tooltip>
    );
  }
);

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 34px;
  min-height: 34px;
  width: max-content;
  padding: 0;
  border-radius: 50%;
  transition: background-color 0.2s;
  ${iconButtonSizeVariants["medium"]};
`;

const ButtonElement = styled.button<
  IconButtonElementProps & {
    color: IconButtonColor;
    isSelected: boolean;
    after: string;
    customColor?: string;
  }
>`
  ${generalIconButtonStyles};
  border-radius: 25px;

  ${({ after }) =>
    after &&
    css`
      &::after {
        content: ${`"${after}"`};
        padding: 0 12px;
        margin-left: -8px;
      }
    `}
`;
