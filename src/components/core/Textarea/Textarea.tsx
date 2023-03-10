import type { ComponentPropsWithRef, Ref } from "react";
import { useEffect } from "react";
import React, { forwardRef, useRef } from "react";

import styled from "styled-components";

interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  label: string;
  value: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const Textarea = forwardRef(
  (
    {
      label,
      value,
      placeholder,
      onValueChange = () => null,
      maxLength = 250,
      ...props
    }: TextareaProps,
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
      const { current } = labelRef;

      if (current && value) {
        const firstChild = current.children[0] as HTMLTextAreaElement;
        const scrollHeight = firstChild.scrollHeight;

        firstChild.style.height = scrollHeight + "px";

        return () => {
          firstChild.style.height = "inherit";
        };
      }
    }, [value]);

    return (
      <Label htmlFor={label} ref={labelRef}>
        <StyledTextarea
          id={label}
          value={value}
          aria-label={label}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={e => onValueChange(e.target.value)}
          {...props}
          ref={ref}
        />
      </Label>
    );
  }
);

const Label = styled.label`
  display: flex;
  width: 100%;
  padding: 12px 0;
  overflow: hidden;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  max-height: 650px;
  direction: ltr;
  text-align: left;
  white-space: pre-wrap;
  user-select: text;
  overflow-wrap: break-word;
  resize: none;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.neutral50};
  ${({ theme }) => theme.text.xl};
`;
