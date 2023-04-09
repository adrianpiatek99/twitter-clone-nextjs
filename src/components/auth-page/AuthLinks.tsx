import React, { useState } from "react";

import { Button, ButtonLink, MenuModal, MenuModalItem } from "components/core";
import { GITHUB_URL, PORTFOLIO_URL, PROJECT_REPO_URL } from "constants/links";
import { HOME_PAGE_ROUTE } from "constants/routes";
import { GithubIcon, WebsiteIcon } from "icons/index";
import Link from "next/link";
import styled from "styled-components";

export const AuthLinks = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <Wrapper>
      <ButtonLink href={HOME_PAGE_ROUTE} color="secondary" size="small">
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
        <StyledLink href={PORTFOLIO_URL} target="_blank" tabIndex={-1} rel="noopener noreferrer">
          <MenuModalItem color="primary" startIcon={<WebsiteIcon />} fullWidth>
            Portfolio
          </MenuModalItem>
        </StyledLink>
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
