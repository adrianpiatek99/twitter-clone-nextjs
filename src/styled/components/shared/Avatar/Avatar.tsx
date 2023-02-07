import React, { memo } from "react";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled, { css } from "styled-components";

import type { AvatarSize } from "./avatarStyleVariants";
import { avatarSizeVariants } from "./avatarStyleVariants";

const DEFAULT_AVATAR_URL =
  "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png";

interface AvatarProps {
  src: string;
  onClick?: () => void;
  screenName?: string;
  size?: AvatarSize;
  loading?: boolean;
  disableFocus?: boolean;
  absolute?: boolean;
}

export const Avatar = memo(
  ({
    src,
    onClick,
    screenName,
    size = "medium",
    loading = false,
    disableFocus = false,
    absolute = false,
    ...props
  }: AvatarProps) => {
    const href = screenName && `/${screenName}`;
    const avatarSrc = src || DEFAULT_AVATAR_URL;

    if (loading) {
      return <Skeleton absolute variant="circular" />;
    }

    const AvatarComponent = () => {
      return (
        <AvatarWrapper
          as={onClick ? "button" : "div"}
          onClick={onClick}
          disabled={disableFocus}
          tabIndex={disableFocus || !onClick ? -1 : 0}
          size={size}
          $absolute={absolute}
          {...props}
        >
          <Image
            src={avatarSrc}
            loader={() => avatarSrc}
            fill
            alt={screenName ?? "Profile image"}
          />
        </AvatarWrapper>
      );
    };

    if (href) {
      return (
        <StyledLink href={href} tabIndex={disableFocus || onClick ? -1 : 0} {...props}>
          <AvatarComponent />
        </StyledLink>
      );
    }

    return <AvatarComponent />;
  }
);

const sharedStyles = css`
  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    border-radius: 50%;
    transition: opacity 0.2s ease;
  }

  @media (hover: hover) {
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
    &::after {
      opacity: 1;
    }
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  border-radius: 50%;
  -webkit-user-drag: none;
  ${sharedStyles};
`;

const AvatarWrapper = styled.div<{ $absolute: boolean; size: AvatarSize }>`
  position: relative;
  display: flex;
  border-radius: 50%;
  transition: 0.2s;
  ${sharedStyles};
  ${({ size }) => avatarSizeVariants[size]};

  & > img {
    position: absolute;
    inset: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: inherit;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }

  ${({ $absolute }) =>
    $absolute &&
    css`
      position: absolute;
      inset: 0px;
      width: 100%;
      height: 100%;
    `}
`;
