import React from "react";

import { Text } from "components/core";
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
    user: {
      screenName,
      name,
      profileImageUrl,
      _count: { following, followedBy }
    }
  } = session;

  return (
    <Wrapper>
      <AvatarRow>
        <Avatar src={profileImageUrl} screenName={screenName} onClick={onClose} />
      </AvatarRow>
      <Content>
        <ProfileNamesRow>
          <Text href={`/${screenName}`} onClick={onClose} size="l" weight={700} truncate>
            {name}
          </Text>
          <Text href={`/${screenName}`} onClick={onClose} color="secondary" truncate>
            {screenName && `@${screenName}`}
          </Text>
        </ProfileNamesRow>
        <FollowsRow>
          <FollowLink href={`/${screenName}/following`} onClick={onClose}>
            <span>{following} </span>
            <span>Following</span>
          </FollowLink>
          <FollowLink href={`/${screenName}/followers`} onClick={onClose}>
            <span>{followedBy} </span>
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

  & * {
    width: 100%;
  }
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
    color: ${({ theme }) => theme.neutral300};
  }
`;

const ProfileNamesRowSkeleton = styled(ProfileNamesRow)`
  gap: 9px;
  width: 75%;
`;
