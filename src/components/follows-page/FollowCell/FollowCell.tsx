import type { ComponentPropsWithRef, Ref } from "react";
import React, { forwardRef, memo } from "react";

import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";
import type { FollowUserData } from "types/user";
import { verifyMe } from "utils/session";

import { FollowCellActions } from "./FollowCellActions";

interface FollowCellProps extends ComponentPropsWithRef<"div"> {
  start: number;
  followUser: FollowUserData;
}

export const FollowCell = memo(
  forwardRef(({ followUser, start, ...props }: FollowCellProps, ref: Ref<HTMLDivElement>) => {
    const { session } = useAppSession();
    const { screenName, profileImageUrl, description } = followUser;
    const itsMe = verifyMe(session, followUser.screenName);

    return (
      <ActionCard
        href={`/${screenName}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${start}px)`
        }}
        {...props}
        ref={ref}
      >
        <StyledAvatar src={profileImageUrl} screenName={screenName} size="large" />
        <Inner>
          <FollowCellActions followUser={followUser} itsMe={itsMe} />
          <DescriptionRow>{description && <Text truncate>{description}</Text>}</DescriptionRow>
        </Inner>
      </ActionCard>
    );
  })
);

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex-grow: 1;
  min-width: 0px;
`;

const StyledAvatar = styled(Avatar)`
  align-self: flex-start;
  z-index: 1;
`;

const DescriptionRow = styled.div`
  display: inline-block;
  width: 98%;
  max-height: 550px;
  white-space: pre-line;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > span {
    display: inline-block;
    white-space: pre-line;
  }
`;
