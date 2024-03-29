import type { ComponentProps, ReactElement } from "react";
import { useEffect } from "react";
import React, { Children, cloneElement, isValidElement } from "react";

import { Text } from "components/core";
import { useUserByScreenNameQuery } from "hooks/useUserByScreenNameQuery";
import type ProfilePage from "pages/[screenName]";
import { ErrorMessage } from "shared/Messages";
import useProfileStore from "store/profileStore";
import styled from "styled-components";
import { reloadSession } from "utils/session";

import { ProfileActions } from "./ProfileActions";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInformation } from "./ProfileInformation";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileTopBar } from "./ProfileTopBar";

interface ProfileLayoutProps {
  children: ReactElement<ComponentProps<typeof ProfilePage>>;
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const setViewedProfile = useProfileStore(state => state.setViewedProfile);
  const { userData, userLoading, itsMe, queryScreenName, isError, error } =
    useUserByScreenNameQuery({});

  const childrenWithProps = Children.map(children, child => {
    if (!isError) {
      if (isValidElement(child)) {
        return cloneElement(child, { userData });
      }

      return child;
    }
  });

  useEffect(() => {
    if (userData) {
      setViewedProfile(userData);
    }
  }, [userData, setViewedProfile]);

  useEffect(() => {
    reloadSession();
  }, []);

  return (
    <Wrapper>
      <ProfileTopBar userData={userData} isLoading={userLoading} />
      <ProfileBanner isLoading={userLoading} src={userData?.profileBannerUrl ?? ""} />
      <ProfileInfoWrapper>
        <FirstRow>
          <ProfileAvatar isLoading={userLoading} src={userData?.profileImageUrl ?? ""} />
          {userData && <ProfileActions itsMe={itsMe} userData={userData} />}
        </FirstRow>
        {isError ? (
          <>
            <Text size="xl" weight={700}>
              @{queryScreenName}
            </Text>
            <ErrorMessage title={error?.message} text="Try searching for another." />
          </>
        ) : (
          <ProfileInformation userData={userData} isLoading={userLoading} />
        )}
      </ProfileInfoWrapper>
      {userData && <ProfileTabs screenName={userData.screenName} />}
      {childrenWithProps}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
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
