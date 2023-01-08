import React, { ComponentPropsWithRef, FC, forwardRef, Ref, useMemo, useState } from "react";

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

    return (
      <Container loading={loading}>
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
      </Container>
    );
  }
);

const Container = styled.div<{ loading: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.background};
  border-radius: 4px;
  transition: opacity 0.2s;

  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const StyledLabel = styled.label<{ isFilled: boolean; error: boolean }>`
  position: absolute;
  inset: 0;
  color: ${({ theme }) => theme.neutral100};
  border: 1px solid ${({ theme }) => theme.border};
  padding-left: 8px;
  border-radius: 4px;
  pointer-events: none;
  overflow: hidden;
  transition: box-shadow 0.15s cubic-bezier(0.33, 1, 0.68, 1),
  color 0.15s cubic-bezier(0.33, 1, 0.68, 1), border-color 0.15s cubic-bezier(0.33, 1, 0.68, 1);

  & > span {
    position: absolute;
    top: 50%;
    transform-origin: left;
    transform: ${({ isFilled }) =>
      isFilled ? "translate(-1px, -110%) scale(0.8)" : "translateY(-50%) scale(1)"};
    transition: transform 0.15s cubic-bezier(0.33, 1, 0.68, 1);
  }

  &${({ error }) =>
    error &&
    css`
      color: ${({ theme }) => theme.error10};
      border: 1px solid ${({ theme }) => theme.error10};
    `}
`;

const StyledInput = styled.input<{ error: boolean; iconsCount: number }>`
  background: transparent;
  padding: 22px 8px 8px;
  width: 100%;
  height: 100%;
  overflow-wrap: break-word;
  color: ${({ theme }) => theme.neutral00};
  outline: none;
  padding-right: ${({ iconsCount }) => `calc(46px * ${iconsCount})`};

  &:focus-visible + ${StyledLabel} {
    box-shadow: ${({ theme, error }) =>
      error ? `${theme.error10}` : `${theme.primary05} 0px 0px 0px 1px`};
    border-color: ${({ theme, error }) => (error ? `${theme.error10}` : theme.primary05)};

    & > span {
      transform: translate(-1px, -110%) scale(0.8);
    }
  }
`;
