import React from "react";

import type { FollowersData } from "api/user/followers";
import { Button, Text } from "components/core";
import { useFollowUserMutation } from "hooks/useFollowUserMutation";
import styled from "styled-components";

interface FollowCellActionsProps {
  followUser: FollowersData["follower"];
  itsMe: boolean;
}

export const FollowCellActions = ({ followUser, itsMe }: FollowCellActionsProps) => {
  const { screenName, name } = followUser;
  const { handleFollowUser, followUserLoading, unfollowUserLoading, isFollowed } =
    useFollowUserMutation({
      followUser
    });

  return (
    <Wrapper>
      <NamesWrapper>
        <Text weight={700} href={`/${screenName}`} truncate>
          {name}
        </Text>
        <Text color="secondary" href={`/${screenName}`} truncate>
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
