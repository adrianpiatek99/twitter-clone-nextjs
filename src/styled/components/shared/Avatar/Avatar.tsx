import React, { ComponentPropsWithoutRef } from "react";

import { Avatar as MuiAvatar } from "@mui/material";
import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

type AvatarSize = "small" | "medium" | "large" | "extraLarge";

interface AvatarProps extends ComponentPropsWithoutRef<"button"> {
  src: string;
  screenName?: string;
  size?: AvatarSize;
  loading?: boolean;
  disableFocus?: boolean;
}

export const Avatar = ({
  src,
  screenName,
  size = "medium",
  loading = false,
  disableFocus = false,
  ...props
}: AvatarProps) => {
  const avatarSize = determineSize(size);

  if (loading) {
    return <Skeleton height={avatarSize} width={avatarSize} variant="circular" />;
  }

  const AvatarComponent = () => {
    return (
      <AvatarButton disabled={disableFocus} tabIndex={disableFocus ? -1 : 0} {...props}>
        <StyledAvatar size={avatarSize} src={src} />
      </AvatarButton>
    );
  };

  return screenName ? (
    <StyledLink href={`/${screenName}`} tabIndex={-1}>
      <AvatarComponent />
    </StyledLink>
  ) : (
    <AvatarComponent />
  );
};

const determineSize = (size: AvatarSize) => {
  if (size === "small") {
    return 32;
  }

  if (size === "large") {
    return 48;
  }

  if (size === "extraLarge") {
    return 68;
  }

  return 40;
};

const StyledLink = styled(Link)`
  -webkit-user-drag: none;
  border-radius: 50%;
`;

const AvatarButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;
  outline: none;
  border: none;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    border-radius: 50%;
    transition: opacity 0.2s ease;
  }

  &:hover,
  &:focus-visible {
    &::after {
      opacity: 1;
    }
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => `${theme.focus.primary} 0px 0px 0px 2px`};
  }
`;

const StyledAvatar = styled(MuiAvatar)<{ size: number }>`
  &&& {
    position: relative;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    cursor: pointer;
    transition: 0.2s;

    & > img {
      user-select: none;
      -webkit-user-drag: none;
    }
  }
`;
