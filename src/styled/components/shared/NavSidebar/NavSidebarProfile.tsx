import React, { useRef, useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CardActionArea } from "@mui/material";
import { type DropdownAnchorEl } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

import { NavSidebarProfileDropdown } from "./NavSidebarProfileDropdown";

export const NavSidebarProfile = () => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<DropdownAnchorEl>(null);
  const userScreenName = session?.user?.screen_name;
  const avatarColumnRef = useRef<HTMLDivElement>(null);

  if (isUnauthenticated) return null;

  const handleOpenDropdown = () => setDropdownAnchorEl(avatarColumnRef.current);

  const handleCloseDropdown = () => setDropdownAnchorEl(null);

  return (
    <>
      <Wrapper>
        <Inner onClick={handleOpenDropdown}>
          <Column>
            <Avatar
              src={session?.user?.profile_image_url ?? ""}
              loading={isSessionLoading}
              disableFocus
            />
          </Column>
          <Column>
            {isSessionLoading ? (
              <ColumnSkeletons>
                <Skeleton height={15} width={80} />
                <Skeleton height={15} width={85} />
              </ColumnSkeletons>
            ) : (
              <>
                <UserName>{session?.user?.name}</UserName>
                <UserScreenName>{userScreenName && `@${userScreenName}`}</UserScreenName>
              </>
            )}
          </Column>
          <Column>
            <MoreHorizIcon />
          </Column>
          <DropdownAnchor ref={avatarColumnRef} />
        </Inner>
      </Wrapper>
      <NavSidebarProfileDropdown anchorEl={dropdownAnchorEl} onClose={handleCloseDropdown} />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 12px 0;
`;

const Inner = styled(CardActionArea)`
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

const DropdownAnchor = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
