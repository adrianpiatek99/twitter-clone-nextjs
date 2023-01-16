import React from "react";

import { useAppSession } from "hooks/useAppSession";
import Link from "next/link";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";

interface NavDrawerHeaderProps {
  onClose: () => void;
}

export const NavDrawerHeader = ({ onClose }: NavDrawerHeaderProps) => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();

  if (isSessionLoading) {
    return (
      <Wrapper>
        <Avatar src="" loading />
        <Content>
          <ProfileNamesRowSkeleton>
            <Skeleton height={20} />
            <Skeleton height={17} />
          </ProfileNamesRowSkeleton>
          <FollowsRow>
            <Skeleton height={14} width={80} />
            <Skeleton height={14} width={80} />
          </FollowsRow>
        </Content>
      </Wrapper>
    );
  }

  if (isUnauthenticated || !session) return null;

  const {
    user: { screenName, name, profileImageUrl, followingCount, followerCount }
  } = session;

  return (
    <Wrapper>
      <AvatarRow>
        <Avatar src={profileImageUrl} screenName={screenName} onClick={onClose} />
      </AvatarRow>
      <Content>
        <ProfileNamesRow>
          <Link href={`/${screenName}`} onClick={onClose}>
            <ProfileName>{name}</ProfileName>
          </Link>
          <Link href={`/${screenName}`} onClick={onClose}>
            <ProfileScreenName>{screenName && `@${screenName}`}</ProfileScreenName>
          </Link>
        </ProfileNamesRow>
        <FollowsRow>
          <FollowLink href={`/${screenName}/following`} onClick={onClose}>
            <span>{followingCount} </span>
            <span>Following</span>
          </FollowLink>
          <FollowLink href={`/${screenName}/followers`} onClick={onClose}>
            <span>{followerCount} </span>
            <span>Followers</span>
          </FollowLink>
        </FollowsRow>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 26px;
`;

const AvatarRow = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileNamesRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.span`
  font-weight: 700;
  ${({ theme }) => theme.text.l};
`;

const ProfileScreenName = styled.div`
  vertical-align: middle;
  color: ${({ theme }) => theme.neutral100};
`;

const FollowsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-top: 4px;
`;

const FollowLink = styled(Link)`
  ${({ theme }) => theme.text.s};

  & > span:last-of-type {
    color: ${({ theme }) => theme.neutral100};
  }
`;

const ProfileNamesRowSkeleton = styled(ProfileNamesRow)`
  gap: 9px;
  width: 75%;
`;
