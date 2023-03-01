import React, { useState } from "react";

import { Button, ButtonLink, MenuModal, MenuModalItem } from "components/core";
import { GithubIcon, WebsiteIcon } from "icons/index";
import Link from "next/link";
import styled from "styled-components";

const GITHUB_URL = "https://github.com/adrianpiatek99";
const PROJECT_REPO_URL = "https://github.com/adrianpiatek99/twitter-clone-nextjs";

export const LoginLinks = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <Wrapper>
      <ButtonLink href="/home" size="small">
        Go to the homepage
      </ButtonLink>
      <Button onClick={() => setIsMenuModalOpen(prev => !prev)} color="secondary" size="small">
        External Links
      </Button>
      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)}>
        <StyledLink href={PROJECT_REPO_URL} target="_blank" tabIndex={-1} rel="noopener noreferrer">
          <MenuModalItem color="primary" startIcon={<GithubIcon />} fullWidth>
            Project Repository
          </MenuModalItem>
        </StyledLink>
        <StyledLink href={GITHUB_URL} target="_blank" tabIndex={-1} rel="noopener noreferrer">
          <MenuModalItem color="primary" startIcon={<GithubIcon />} fullWidth>
            GitHub
          </MenuModalItem>
        </StyledLink>
        <MenuModalItem color="primary" startIcon={<WebsiteIcon />}>
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
  flex-wrap: wrap;
  width: 100%;
  gap: 12px;
  padding: 12px;
  margin-top: auto;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: absolute;
    bottom: 0px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;
