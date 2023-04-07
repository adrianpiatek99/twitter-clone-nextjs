import React, { useState } from "react";

import { Button } from "components/core";
import { useToggleFollowUserMutation } from "hooks/useToggleFollowUserMutation";
import dynamic from "next/dynamic";
import styled from "styled-components";
import type { UserData } from "types/user";

const LazyEditProfileModal = dynamic(
  () => import("./Modals/EditProfileModal").then(mod => mod.EditProfileModal),
  {
    ssr: false
  }
);

interface ProfileActionsProps {
  itsMe: boolean;
  userData: UserData;
}

export const ProfileActions = ({ itsMe, userData }: ProfileActionsProps) => {
  const { handleFollowUser, followUserLoading, unfollowUserLoading, isFollowed } =
    useToggleFollowUserMutation({
      followUser: userData
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
        <LazyEditProfileModal
          isOpen={isEditProfileModalOpen}
          onClose={() => setIsEditProfileModalOpen(false)}
          userData={userData}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
