import React from "react";

import { Button, Text } from "components/core";
import { useToggleFollowUserMutation } from "hooks/useToggleFollowUserMutation";
import styled from "styled-components";
import type { FollowUserData } from "types/user";
import { profilePageHref } from "utils/hrefs";

interface FollowCellActionsProps {
  followUser: FollowUserData;
  itsMe: boolean;
}

export const FollowCellActions = ({ followUser, itsMe }: FollowCellActionsProps) => {
  const { screenName, name } = followUser;
  const { handleFollowUser, followUserLoading, unfollowUserLoading, isFollowed } =
    useToggleFollowUserMutation({
      followUser
    });

  return (
    <Wrapper>
      <NamesWrapper>
        <Text weight={700} href={profilePageHref(screenName)} truncate>
          {name}
        </Text>
        <Text color="secondary" href={profilePageHref(screenName)} truncate>
          @{screenName}
        </Text>
      </NamesWrapper>
      {!itsMe &&
        (isFollowed ? (
          <Button
            color="secondary"
            variant="outlined"
            loading={unfollowUserLoading}
            onClick={handleFollowUser}
            size="small"
          >
            Following
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            loading={followUserLoading}
            onClick={handleFollowUser}
            size="small"
          >
            Follow
          </Button>
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 0px;
  gap: 12px;
  color: ${({ theme }) => theme.neutral300};
`;

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0px;

  & * {
    z-index: 1;
  }
`;
