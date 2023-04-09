import React, { useState } from "react";

import { Button } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { PlusIcon } from "icons/index";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";
import { profilePageHref } from "utils/hrefs";

import { NavSidebarItem } from "./NavSidebarItem";
import {
  authenticatedNavSidebarItems,
  navSidebarHomeItem,
  navSidebarProfileItem
} from "./navSidebarItemsHelper";
import { NavSidebarLogo } from "./NavSidebarLogo";
import { NavSidebarProfile } from "./NavSidebarProfile";

const LazyCreateTweetModal = dynamic(() =>
  import("components/shared/Modals").then(mod => mod.CreateTweetModal)
);

export const NavSidebar = () => {
  const { session } = useAppSession();
  const { pathname, asPath } = useRouter();
  const [isCreateTweetModalModal, setIsCreateTweetModalModal] = useState(false);
  const isProfileItemActive =
    pathname.includes(navSidebarProfileItem.route) &&
    asPath.includes(session?.user.screenName ?? "") &&
    !pathname.includes("tweet");

  return (
    <>
      <Container>
        <Wrapper>
          <Inner>
            <NavWrapper>
              <NavSidebarLogo />
              <NavList>
                <NavSidebarItem
                  {...navSidebarHomeItem}
                  href={navSidebarHomeItem.route}
                  active={asPath.includes(navSidebarHomeItem.route)}
                />
                {session && (
                  <>
                    {authenticatedNavSidebarItems.map(({ route, ...props }) => (
                      <NavSidebarItem
                        key={route}
                        href={route}
                        active={asPath.includes(route)}
                        {...props}
                      />
                    ))}
                    <NavSidebarItem
                      {...navSidebarProfileItem}
                      href={profilePageHref(session.user.screenName)}
                      active={isProfileItemActive}
                    />
                    <CreateTweetButton
                      aria-label="Create tweet"
                      fullWidth
                      onClick={() => setIsCreateTweetModalModal(prev => !prev)}
                    >
                      <span>Tweet</span>
                      <span>
                        <PlusIcon />
                      </span>
                    </CreateTweetButton>
                  </>
                )}
              </NavList>
            </NavWrapper>
            <NavSidebarProfile />
          </Inner>
        </Wrapper>
      </Container>
      <LazyCreateTweetModal
        isOpen={isCreateTweetModalModal}
        onClose={() => setIsCreateTweetModalModal(false)}
      />
    </>
  );
};

const Container = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    max-width: 88px;
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-width: 275px;
  }
`;

const Wrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: fixed;
    top: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 88px;
    width: 100%;
    height: 100vh;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    max-width: 275px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 12px;
  gap: 8px;
  height: 100%;
  width: 100%;
  overflow-y: overlay;
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  @media ${({ theme }) => theme.breakpoints.xl} {
    align-items: flex-start;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px 0px;
  width: 100%;
`;

const CreateTweetButton = styled(Button)`
  width: 50px;
  height: 50px;
  margin: 16px auto;

  @media ${({ theme }) => theme.breakpoints.sm} {
    & > span > span {
      &:nth-child(1) {
        display: none;
      }
      &:nth-child(2) {
        display: flex;

        & > svg {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    width: 100%;

    & > span > span {
      &:nth-child(1) {
        display: flex;
      }
      &:nth-child(2) {
        display: none;
      }
    }
  }
`;
