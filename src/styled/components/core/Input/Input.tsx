import type { ComponentPropsWithRef, FC, Ref } from "react";
import React, { forwardRef, useMemo, useRef, useState } from "react";

import styled, { css } from "styled-components";

import { InputIcons } from "./InputIcons";

export type InputType = "text" | "password" | "email" | "number" | "tel" | "url";

interface InputProps extends Omit<ComponentPropsWithRef<"input">, "type" | "size"> {
  label: string;
  onValueChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  type?: InputType;
  error?: string;
}

export const Input: FC<InputProps> = forwardRef(
  (
    {
      label,
      name,
      value,
      loading = false,
      disabled = false,
      onValueChange = () => null,
      type = "text",
      error,
      ...props
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputType = isPasswordVisible ? "text" : type;
    const isPasswordIcon = type === "password";

    const iconsCount = useMemo(() => {
      if (isPasswordIcon && !!error) {
        return 2;
      }

      if (isPasswordIcon || !!error) {
        return 1;
      }

      return 0;
    }, [isPasswordIcon, error]);

    const setFocus = event => {
      if (event.target === wrapperRef.current) {
        const input = event.target.querySelector(":scope > input") as HTMLInputElement;

        input.focus();
      }
    };

    return (
      <Wrapper $loading={loading} ref={wrapperRef} onClick={setFocus}>
        <StyledInput
          id={label}
          type={inputType}
          name={name || label}
          value={value}
          onChange={e => onValueChange(e.target.value)}
          iconsCount={iconsCount}
          autoComplete="off"
          maxLength={255}
          error={!!error}
          disabled={loading || disabled}
          {...props}
          ref={ref}
        />
        <StyledLabel isFilled={!!value} error={!!error}>
          <span>{label}</span>
        </StyledLabel>
        <InputIcons
          isPasswordIcon={isPasswordIcon}
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
          error={error}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div<{ $loading: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.background};
  border-radius: 4px;
  height: 50px;
  cursor: text;
  transition: opacity 0.2s;

  ${({ $loading }) =>
    $loading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const StyledLabel = styled.label<{ isFilled: boolean; error: boolean }>`
  position: absolute;
  inset: 0;
  color: ${({ theme }) => theme.neutral300};
  border: 1px solid ${({ theme }) => theme.border};
  padding-left: 8px;
  border-radius: 4px;
  pointer-events: none;
  overflow: hidden;
  transition: box-shadow 0.15s, color 0.15s, border-color 0.15s;

  & > span {
    position: absolute;
    top: 50%;
    transform-origin: left;
    transform: ${({ isFilled }) =>
      isFilled ? "translate(-1px, -110%) scale(0.8)" : "translateY(-50%) scale(1)"};
    transition: transform 0.15s;
  }

  &${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.error40};
      border: 1px solid ${({ theme }) => theme.error40};
    `}
`;

const StyledInput = styled.input<{ error: boolean; iconsCount: number }>`
  background: transparent;
  padding: 0px 8px;
  margin: 24px 0 6px 0;
  width: 100%;
  height: 20px;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.white};
  outline: none;
  padding-right: ${({ iconsCount }) => (iconsCount ? `calc(46px * ${iconsCount})` : "8px")};

  &:focus-visible + ${StyledLabel} {
    box-shadow: ${({ theme, error }) =>
      error ? `${theme.error40}` : `${theme.primary05} 0px 0px 0px 1px`};
    border-color: ${({ theme, error }) => (error ? `${theme.error40}` : theme.primary05)};
    color: ${({ theme }) => theme.primary05};

    & > span {
      transform: translate(-1px, -110%) scale(0.8);
    }
  }

  ${({ error }) =>
    error &&
    css`
      &:focus-visible + ${StyledLabel} {
        color: ${({ theme }) => theme.error40};
      }
    `};
`;
