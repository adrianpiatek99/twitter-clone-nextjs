import React, { useState } from "react";

import { CardActionArea } from "@mui/material";
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
        <Inner>
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
        </Inner>
      </Wrapper>
    );
  }

  if (isUnauthenticated || !session) return null;

  const {
    user: { screenName, profileImageUrl, name }
  } = session;

  return (
    <Wrapper>
      <Inner onClick={() => setIsMenuModalOpen(true)}>
        <Column>
          <Avatar src={profileImageUrl} disableFocus />
        </Column>
        <Column>
          <UserName>{name}</UserName>
          <UserScreenName>{screenName}</UserScreenName>
        </Column>
        <Column>
          <MoreHorizontalIcon />
        </Column>
      </Inner>
      <NavSidebarProfileMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 12px 0;
`;

const Inner = styled(CardActionArea)`
  &&& {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    border-radius: 50px;
    padding: 12px;
    width: 100%;
    transition: background-color 0.2s;

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: ${({ theme }) => hexToRGBA(theme.neutral00, 0.05)};
    }

    &:focus-visible {
      box-shadow: ${({ theme }) => theme.neutral20} 0px 0px 0px 2px;
    }
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
    }

    &:nth-child(3) {
      align-items: flex-end;
      flex-grow: 1;

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

const UserName = styled.span`
  font-weight: 700;
`;

const UserScreenName = styled.span`
  color: ${({ theme }) => theme.neutral100};
`;
