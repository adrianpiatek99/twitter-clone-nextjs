import type { ComponentPropsWithRef, KeyboardEvent, MouseEvent, Ref } from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import React from "react";

import type { LinkProps } from "next/link";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { hexToRGBA } from "utils/colors";

type ActionCardTag = "div" | "article";

interface ActionCardProps extends ComponentPropsWithRef<"div"> {
  tag?: ActionCardTag;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  href?: LinkProps["href"];
  label?: string;
}

export const ActionCard = forwardRef(
  (
    { children, tag = "div", href, onClick, label, ...props }: ActionCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const current = linkRef.current;

      if (current) {
        if (e.key === "Enter" || ["Spacebar", " "].indexOf(e.key) >= 0) {
          const parent = current.parentElement;
          const target = e.target;

          if (parent === target) {
            e.preventDefault();
            linkRef?.current?.click();
          }
        }
      }
    };

    return (
      <Card
        as={tag}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}
        ref={ref}
      >
        {href && (
          <StyledLink
            ref={linkRef}
            tabIndex={-1}
            draggable={false}
            aria-label={label}
            href={href}
          />
        )}
        {children}
      </Card>
    );
  }
);

const enterCardAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  inset: 0px;
  width: 100%;
  height: 100%;
  transition: background-color 0.2s, box-shadow 0.2s;
  user-select: none;
  -webkit-user-select: none;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  padding: 12px 16px;
  gap: 12px;
  width: 100%;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;
  animation: ${enterCardAnimation} 0.3s ease-out;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }
  }

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    box-shadow: ${({ theme }) => theme.boxShadows.primary} inset;
  }
`;
