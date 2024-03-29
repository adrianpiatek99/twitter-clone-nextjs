import type { ComponentProps, ReactElement } from "react";
import { Children, cloneElement, isValidElement } from "react";
import React from "react";

import { useUserByScreenNameQuery } from "hooks/useUserByScreenNameQuery";
import type ProfileFollowingPage from "pages/[screenName]/following";
import { ErrorMessage } from "shared/Messages";
import styled from "styled-components";

import { FollowsTopBar } from "./FollowsTopBar";

interface FollowsLayoutProps {
  children: ReactElement<ComponentProps<typeof ProfileFollowingPage>>;
}

export const FollowsLayout = ({ children }: FollowsLayoutProps) => {
  const { userData, userLoading, queryScreenName, error, isError } = useUserByScreenNameQuery({});

  const childrenWithProps = Children.map(children, child => {
    if (!isError) {
      if (isValidElement(child)) {
        return cloneElement(child, { userData });
      }

      return child;
    }
  });

  return (
    <Wrapper>
      <FollowsTopBar
        userData={userData}
        userLoading={userLoading}
        queryScreenName={queryScreenName}
      />
      {isError ? (
        <ErrorMessage title={error?.message} text="Try searching for another." />
      ) : (
        <Content>{childrenWithProps}</Content>
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
