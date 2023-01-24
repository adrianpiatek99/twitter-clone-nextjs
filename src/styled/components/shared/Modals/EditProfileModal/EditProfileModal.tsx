import React from "react";

import { UserData } from "api/user/userByScreenName";
import { Input, Modal } from "components/core";
import styled from "styled-components";

import { EditProfileAvatar } from "./EditProfileAvatar";
import { EditProfileModalBanner } from "./EditProfileModalBanner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  userData: { profileBannerUrl, profileImageUrl }
}: EditProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="Edit profile" onAccept={() => null}>
      <Inner>
        <EditProfileModalBanner isLoading={false} src={profileBannerUrl} />
        <Content>
          <EditProfileAvatar src={profileImageUrl} />
          <Form>
            <Input label="Name" />
            <Input label="Bio" />
            <Input label="Website" />
          </Form>
        </Content>
      </Inner>
    </Modal>
  );
};

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 16px 48px 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
