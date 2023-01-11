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
  if (loading) {
    return <Skeleton height={determineSize(size)} width={determineSize(size)} variant="circular" />;
  }

  const AvatarComponent = () => {
    return (
      <StyledAvatar size={determineSize(size)} src={src} {...props}>
        Avatar
      </StyledAvatar>
    );
  };

  return screenName ? (
    <StyledLink href={`/${screenName}`} tabIndex={disableFocus ? -1 : 0}>
      {AvatarComponent()}
    </StyledLink>
  ) : (
    AvatarComponent()
  );
};

const determineSize = (size: AvatarSize) => {
  if (size === "small") {
    return 32;
  }

  if (size === "large") {
    return 64;
  }

  if (size === "extraLarge") {
    return 128;
  }

  return 40;
};

const StyledLink = styled(Link)`
  user-select: none;
  -webkit-user-drag: none;
  border-radius: 50%;
`;

const StyledAvatar = styled(MuiAvatar)<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  & > img {
    user-select: none;
    -webkit-user-drag: none;
  }
`;
