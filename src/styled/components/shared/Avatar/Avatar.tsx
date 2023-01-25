import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled, { css } from "styled-components";

const defaultAvatarUrl =
  "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png";

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

export const Avatar = ({
  src,
  onClick,
  screenName,
  size = "medium",
  loading = false,
  disableFocus = false,
  absolute = false,
  ...props
}: AvatarProps) => {
  const avatarSize = determineSize(size);
  const href = screenName && `/${screenName}`;

  if (loading) {
    return <Skeleton absolute variant="circular" />;
  }

  const AvatarComponent = () => {
    return (
      <AvatarWrapper {...props}>
        <Image
          unoptimized={true}
          src={src || defaultAvatarUrl}
          fill
          alt={screenName ?? "Profile image"}
        />
      </AvatarWrapper>
    );
  };

  if (href) {
    return (
      <StyledLink
        $absolute={absolute}
        size={avatarSize}
        href={href}
        onClick={onClick}
        tabIndex={disableFocus ? -1 : 0}
        {...props}
      >
        <AvatarComponent />
      </StyledLink>
    );
  }

  return (
    <AvatarButton
      $absolute={absolute}
      size={avatarSize}
      as={onClick ? "button" : "div"}
      onClick={onClick}
      disabled={disableFocus}
      tabIndex={disableFocus || !onClick ? -1 : 0}
    >
      <AvatarComponent />
    </AvatarButton>
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

const sharedStyles = css<{ size: number; $absolute: boolean }>`
  position: relative;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;

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

  ${({ $absolute }) =>
    $absolute &&
    css`
      position: absolute;
      inset: 0px;
      width: 100%;
      height: 100%;
    `}
`;

const StyledLink = styled(Link)`
  -webkit-user-drag: none;
  ${sharedStyles};
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${sharedStyles};

  &:disabled {
    pointer-events: none;
    cursor: default;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: 0.2s;

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
`;
