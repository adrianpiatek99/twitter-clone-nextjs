import React from "react";

import { ButtonLink, Heading, Modal, Text } from "components/core";
import { PeopleIcon } from "icons/index";
import { useRouter } from "next/router";
import useGlobalStore from "store/globalStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";

export const AuthenticationRequiredModal = () => {
  const { asPath } = useRouter();
  const { isAuthRequiredModalOpen, openAuthRequiredModal } = useGlobalStore(
    state => ({
      isAuthRequiredModalOpen: state.isAuthRequiredModalOpen,
      openAuthRequiredModal: state.openAuthRequiredModal
    }),
    shallow
  );
  const redirect = `redirect=${asPath}`;

  const handleCloseModal = () => openAuthRequiredModal(false);

  return (
    <Modal isOpen={isAuthRequiredModalOpen} onClose={handleCloseModal}>
      <Wrapper>
        <PeopleIcon />
        <Content>
          <Heading size="s">Authentication is required.</Heading>
          <Text color="secondary">You need to sign in to your account.</Text>
          <Actions>
            <ButtonLink href={`/?${redirect}`} onClick={handleCloseModal} fullWidth>
              Sign in
            </ButtonLink>
            <ButtonLink
              href={`/?tab=sign-up&${redirect}`}
              onClick={handleCloseModal}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Create Account
            </ButtonLink>
          </Actions>
        </Content>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  & > svg {
    width: 54px;
    height: 54px;
    color: ${({ theme }) => theme.primary05};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 24px;
  gap: 12px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
`;
