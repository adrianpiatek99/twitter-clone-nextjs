import React, { memo, useState } from "react";

import type { UserData } from "api/user/userByScreenName";
import { Button } from "components/core";
import { useFollowUserMutation } from "hooks/useFollowUserMutation";
import styled from "styled-components";

import { EditProfileModal } from "../Modals/EditProfileModal";

interface ProfileActionsProps {
  itsMe: boolean;
  userData: UserData;
}

export const ProfileActions = memo(({ itsMe, userData }: ProfileActionsProps) => {
  const { handleFollowUser, followUserLoading, unfollowUserLoading, isFollowed } =
    useFollowUserMutation({
      followerData: userData
    });
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  return (
    <Wrapper>
      {itsMe ? (
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => setIsEditProfileModalOpen(prev => !prev)}
        >
          Edit profile
        </Button>
      ) : isFollowed ? (
        <Button
          color="secondary"
          variant="outlined"
          loading={unfollowUserLoading}
          onClick={handleFollowUser}
        >
          Following
        </Button>
      ) : (
        <Button
          color="secondary"
          variant="contained"
          loading={followUserLoading}
          onClick={handleFollowUser}
        >
          Follow
        </Button>
      )}
      {itsMe && (
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          userData={userData}
        />
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
`;
