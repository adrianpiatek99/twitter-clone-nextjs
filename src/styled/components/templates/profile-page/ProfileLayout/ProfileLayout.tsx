import React, { Children, cloneElement, isValidElement, ReactNode } from "react";

import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useUserByScreenNameQuery } from "hooks/useUserByScreenNameQuery";
import { useRouter } from "next/router";
import { ErrorMessage } from "shared/ErrorMessage";
import styled from "styled-components";

import { ProfileTopBar } from "../ProfileTopBar";
import { ProfileActions } from "./ProfileActions";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInformation } from "./ProfileInformation";
import { ProfileTabs } from "./ProfileTabs";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const { query } = useRouter();
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const { session, isSessionLoading } = useAppSession();
  const itsMe = session
    ? queryScreenName.toLowerCase() === session.user.screenName.toLowerCase()
    : false;
  const { data, userByScreenNameLoading, isError, error } = useUserByScreenNameQuery({
    queryScreenName,
    enabled: !itsMe
  });
  const userLoading = itsMe ? isSessionLoading : userByScreenNameLoading;
  const userData = itsMe ? session?.user : data;

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
      <ProfileTopBar userData={userData} isLoading={userLoading} />
      <ProfileBanner isLoading={userLoading} src={userData?.profileBannerUrl ?? ""} />
      <ProfileInfoWrapper>
        <FirstRow>
          <ProfileAvatar isLoading={userLoading} src={userData?.profileImageUrl ?? ""} />
          {userData && <ProfileActions itsMe={itsMe} userData={userData} />}
        </FirstRow>
        <ProfileInformation userData={userData} isLoading={userLoading} />
        {isError && (
          <>
            <Text size="xl" weight={700}>
              @{queryScreenName}
            </Text>
            <ErrorMessage message={error?.message} />
          </>
        )}
      </ProfileInfoWrapper>
      {userData && <ProfileTabs />}
      {childrenWithProps}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 16px 16px;
  gap: 12px;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
