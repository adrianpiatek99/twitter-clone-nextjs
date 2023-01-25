import type { ComponentPropsWithRef, FC, Ref } from "react";
import React, { forwardRef, useRef } from "react";

import styled from "styled-components";

interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  onValueChange?: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const Textarea: FC<TextareaProps> = forwardRef(
  (
    { placeholder, onValueChange = () => null, maxLength = 250, ...props },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    const handleChange = event => {
      onValueChange?.(event.target.value);
      props.onChange?.(event);

      const textareaLineHeight = 24;
      const minRows = 2;
      const maxRows = 12;

      const previousRows = event.target.rows;

      event.target.rows = minRows; // reset number of rows in textarea

      const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

      if (currentRows === previousRows) {
        event.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        event.target.rows = maxRows;
        event.target.scrollTop = event.target.scrollHeight;
      }

      event.target.rows = currentRows < maxRows ? currentRows : maxRows;
    };

    return (
      <Label ref={labelRef}>
        <StyledTextarea
          placeholder={placeholder}
          maxLength={maxLength}
          {...props}
          onChange={e => handleChange(e)}
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
  font-size: 18px;
  font-weight: 400;
  padding: 2px 0;
  resize: none;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.neutral50};
  ${({ theme }) => theme.text.xl};
`;
