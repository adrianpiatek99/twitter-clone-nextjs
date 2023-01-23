import React, { useState } from "react";

import { UserData } from "api/user/userByScreenName";
import { Button } from "components/core";
import { EditProfileModal } from "shared/Modals/EditProfileModal";
import styled from "styled-components";

interface ProfileActionsProps {
  itsMe: boolean;
  userData: UserData;
}

export const ProfileActions = ({ itsMe, userData }: ProfileActionsProps) => {
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
      ) : (
        <Button color="secondary" variant="contained">
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
};

const Wrapper = styled.div`
  display: flex;
`;