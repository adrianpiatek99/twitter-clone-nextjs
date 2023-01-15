import React, { ComponentPropsWithoutRef } from "react";

import { Avatar as MuiAvatar } from "@mui/material";
import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

type AvatarSize = "small" | "medium" | "large" | "extraLarge";

interface AvatarProps extends ComponentPropsWithoutRef<typeof MuiAvatar> {
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
    return <StyledAvatar size={avatarSize} src={src} {...props} />;
  };

  return screenName ? (
    <StyledLink href={`/${screenName}`} tabIndex={loading || disableFocus ? -1 : 0}>
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
  position: relative;
  -webkit-user-drag: none;
  border-radius: 50%;

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover,
  &:focus-visible {
    &::after {
      opacity: 1;
    }
  }

  &:focus-visible {
    background-color: rgb(142, 205, 248);
    box-shadow: rgb(199, 230, 252) 0px 0px 0px 2px;
  }
`;

const StyledAvatar = styled(MuiAvatar)<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  cursor: pointer;

  & > img {
    user-select: none;
    -webkit-user-drag: none;
  }
`;
