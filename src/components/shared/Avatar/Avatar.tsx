import React, { memo } from "react";

import { Skeleton } from "components/core";
import { DEFAULT_AVATAR_URL } from "constants/links";
import Image from "next/legacy/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { profilePageHref } from "utils/hrefs";

type AvatarSize = "small" | "medium" | "large" | "extraLarge";

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
    const href = screenName && profilePageHref(screenName);
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
          size={determineSize(size)}
          tabIndex={disableFocus || !onClick ? -1 : 0}
          $absolute={absolute}
          {...props}
        >
          <Image
            priority
            src={avatarSrc}
            layout="fill"
            objectFit="cover"
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

const determineSize = (size: AvatarSize) => {
  if (size === "small") return 32;

  if (size === "large") return 48;

  if (size === "extraLarge") return 68;

  return 40;
};

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

const AvatarWrapper = styled.div<{ $absolute: boolean; size: number }>`
  position: relative;
  display: flex;
  border-radius: 50%;
  transition: 0.2s;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  cursor: pointer;
  z-index: 1;
  ${sharedStyles};

  & > span {
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
