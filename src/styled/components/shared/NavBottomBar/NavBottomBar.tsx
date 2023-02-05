import React, { useState } from "react";

import { useAppSession } from "hooks/useAppSession";
import PlusIcon from "icons/PlusIcon";
import { useRouter } from "next/router";
import { CreateTweetModal } from "shared/Modals";
import styled from "styled-components";

import { navBottomBarItems, navBottomBarSignInItem } from "./navBottomBarItems";
import { NavBottomBarLink } from "./NavBottomBarLink";

export const NavBottomBar = () => {
  const { asPath } = useRouter();
  const { session, isAuthenticated } = useAppSession();
  const [isCreateTweetModalOpen, setIsCreateTweetModalOpen] = useState(false);

  return (
    <Wrapper>
      <Content>
        <NavList isAuthenticated={isAuthenticated}>
          {isAuthenticated ? (
            navBottomBarItems.map(({ href, ...props }) => (
              <NavBottomBarLink key={href} href={href} active={asPath.includes(href)} {...props} />
            ))
          ) : (
            <>
              {navBottomBarItems.slice(0, 2).map(({ href, ...props }) => (
                <NavBottomBarLink
                  key={href}
                  href={href}
                  active={asPath.includes(href)}
                  {...props}
                />
              ))}
              <NavBottomBarLink active={false} {...navBottomBarSignInItem} />
            </>
          )}
        </NavList>
      </Content>
      {session && (
        <>
          <CreateTweetButton
            aria-label="Create tweet"
            onClick={() => setIsCreateTweetModalOpen(prev => !prev)}
          >
            <PlusIcon />
          </CreateTweetButton>
          <CreateTweetModal
            isOpen={isCreateTweetModalOpen}
            onClose={() => setIsCreateTweetModalOpen(false)}
            profileImageUrl={session.user.profileImageUrl}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(28, 28, 30, 0.65);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 1000;

  &::after {
    content: "";
    position: absolute;
    display: block;
    top: 0px;
    width: 100%;
    height: 1px;
    z-index: 1;
    background-color: ${({ theme }) => theme.border};
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 480px;
  width: 100%;
  min-height: 52px;
  height: 100%;
  margin: 0 auto;
  padding: 0 16px;
  z-index: 2;
`;

const NavList = styled.nav<{ isAuthenticated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isAuthenticated }) => (isAuthenticated ? "space-between" : "space-around")};
  width: 100%;
  height: 100%;
`;

const CreateTweetButton = styled.button`
  position: absolute;
  top: -67px;
  right: 15px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.white};
  height: 54px;
  width: 54px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary05};
  transition: transform 0.2s ease;

  & > svg {
    width: 32px;
    height: 32px;
  }

  &:active {
    transform: scale(0.8);
  }
`;
