import React, { useState } from "react";

import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

import { NavSidebarProfileMenuModal } from "./NavSidebarProfileMenuModal";

export const NavSidebarProfile = () => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  if (isSessionLoading) {
    return (
      <Wrapper>
        <Content>
          <Column>
            <Avatar src={""} loading />
          </Column>
          <Column>
            <ColumnSkeletons>
              <Skeleton height={15} width={80} />
              <Skeleton height={15} width={85} />
            </ColumnSkeletons>
          </Column>
          <Column>
            <Skeleton height={5} width={15} />
          </Column>
        </Content>
      </Wrapper>
    );
  }

  if (isUnauthenticated || !session) return null;

  const {
    user: { screenName, profileImageUrl, name }
  } = session;

  return (
    <Wrapper>
      <Content onClick={() => setIsMenuModalOpen(true)}>
        <Column>
          <Avatar src={profileImageUrl} disableFocus />
        </Column>
        <Column>
          <Text weight={700} truncate>
            {name}
          </Text>
          <Text color="secondary" truncate>
            @{screenName}
          </Text>
        </Column>
        <Column>
          <MoreHorizontalIcon />
        </Column>
      </Content>
      <NavSidebarProfileMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 12px 0;
`;

const Content = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  gap: 12px;
  border-radius: 50px;
  padding: 12px;
  text-align: left;
  color: ${({ theme }) => theme.neutral50};
  cursor: pointer;
  transition: 0.2s;
  min-width: 0px;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    }
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.15)};
  }

  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral50, 0.1)};
    box-shadow: ${({ theme }) => theme.boxShadows.secondary};
  }
`;

const Column = styled.div`
  &:nth-child(2),
  &:nth-child(3) {
    display: none;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    &:nth-child(2),
    &:nth-child(3) {
      display: flex;
      min-width: 0px;
    }

    &:nth-child(3) {
      align-items: flex-end;

      & > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ColumnSkeletons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
