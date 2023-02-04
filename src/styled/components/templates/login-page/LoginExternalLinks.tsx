import React, { useState } from "react";

import { Button, MenuModal, MenuModalItem } from "components/core";
import GithubIcon from "icons/GithubIcon";
import WebsiteIcon from "icons/WebsiteIcon";
import styled from "styled-components";

export const LoginExternalLinks = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const handleCloseModal = () => setIsMenuModalOpen(false);

  return (
    <Wrapper>
      <Button onClick={() => setIsMenuModalOpen(prev => !prev)} color="secondary" size="small">
        External Links
      </Button>
      <MenuModal isOpen={isMenuModalOpen} onClose={handleCloseModal}>
        <MenuModalItem color="primary" onClick={handleCloseModal} startIcon={<GithubIcon />}>
          Project Repository
        </MenuModalItem>
        <MenuModalItem color="primary" onClick={handleCloseModal} startIcon={<GithubIcon />}>
          GitHub
        </MenuModalItem>
        <MenuModalItem color="primary" onClick={handleCloseModal} startIcon={<WebsiteIcon />}>
          Portfolio
        </MenuModalItem>
      </MenuModal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 12px;
  margin-top: auto;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: absolute;
    bottom: 0px;
  }
`;
