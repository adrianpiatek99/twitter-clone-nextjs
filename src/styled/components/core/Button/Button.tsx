import React, { ComponentPropsWithRef, FC, forwardRef, Ref, useMemo } from "react";

import { Button as MuiButton } from "@mui/material";
import styled, { css, useTheme } from "styled-components";

import { Loader } from "../Loader";
import {
  ButtonColor,
  ButtonColors,
  ButtonSize,
  ButtonVariant,
  getSpecificButtonVariant,
  sizeVariants
} from "./buttonStyleVariants";

interface ButtonProps extends Omit<ComponentPropsWithRef<typeof MuiButton>, "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef(
  (
    {
      variant = "contained",
      size = "medium",
      color = "primary",
      loading = false,
      disabled = false,
      children,
      ...props
    },
    ref: Ref<HTMLButtonElement>
  ) => {
    const { primary05, neutral20, darker10, error20 } = useTheme();
    const loaderColor = color === "primary" ? "primary" : "secondary";
    const isContained = variant === "contained";
    const isOutlined = variant === "outlined";
    const isText = variant === "text";

    const specificColors = useMemo(() => {
      if (color === "secondary") {
        if (isContained) {
          return { color: darker10, backgroundColor: neutral20 };
        }

        if (isOutlined) {
          return { color: primary05, backgroundColor: neutral20 };
        }

        if (isText) {
          return { color: neutral20, backgroundColor: neutral20 };
        }
      }

      if (color === "primary") {
        if (isOutlined) {
          return { color: neutral20, backgroundColor: neutral20 };
        }

        if (isText) {
          return { color: primary05, backgroundColor: primary05 };
        }
      }

      if (color === "danger") {
        if (isContained) {
          return { color: neutral20, backgroundColor: error20 };
        }

        return { color: error20, backgroundColor: error20 };
      }

      return { color: neutral20, backgroundColor: primary05 };
    }, [color, variant]);

    return (
      <ButtonElement
        aria-label={loading ? "Loading" : undefined}
        variant={variant}
        $colors={specificColors}
        size={size}
        $loading={loading}
        disabled={loading || disabled}
        {...props}
        ref={ref}
      >
        {loading && (
          <LoaderWrapper>
            <Loader color={loaderColor} />
          </LoaderWrapper>
        )}
        <span>{children}</span>
      </ButtonElement>
    );
  }
);

const ButtonElement = styled(MuiButton)<
  ButtonProps & { $loading: boolean; variant: ButtonVariant; $colors: ButtonColors }
>`
  &&& {
    position: relative;
    min-width: 36px;
    border-radius: 50px;
    overflow-wrap: break-word;
    text-transform: none;
    padding-top: 0px;
    padding-bottom: 0px;
    box-shadow: none;
    transition: all 0.2s;

    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus-visible {
      box-shadow: none;
    }

    ${({ theme }) => theme.text.m};
    ${({ size }) => sizeVariants[size || "normal"]}

    ${({ $colors, variant }) => getSpecificButtonVariant({ ...$colors, variant })}

    ${({ $loading }) =>
      $loading &&
      css`
        & > span {
          opacity: 0;
        }
      `};
  }
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
