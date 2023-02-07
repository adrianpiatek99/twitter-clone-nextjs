import type { ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import React from "react";

import { useUserByScreenNameQuery } from "hooks/useUserByScreenNameQuery";
import { ErrorMessage } from "shared/Messages";
import styled from "styled-components";

import { ProfileFollowsTopBar } from "./ProfileFollowsTopBar";

interface ProfileFollowsLayoutProps {
  children: ReactNode;
}

export const ProfileFollowsLayout = ({ children }: ProfileFollowsLayoutProps) => {
  const { userData, userLoading, queryScreenName, error, isError } = useUserByScreenNameQuery({});

  const childrenWithProps = Children.map(children, child => {
    if (userData && !isError) {
      if (isValidElement(child)) {
        return cloneElement(child as JSX.Element, { userData });
      }

      return child;
    }
  });

  return (
    <Wrapper>
      <ProfileFollowsTopBar
        userData={userData}
        userLoading={userLoading}
        queryScreenName={queryScreenName}
      />
      {isError ? (
        <ErrorMessage title={error?.message} text="Try searching for another." />
      ) : (
        !userLoading && <Content>{childrenWithProps}</Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
