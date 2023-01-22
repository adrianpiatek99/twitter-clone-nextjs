import React, { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";
import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import CalendarIcon from "icons/CalendarIcon";
import { userByScreenName } from "network/user/userByScreenName";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getFormattedDate } from "utils/timeUtils";

import { ProfileTopBar } from "../ProfileTopBar";
import { ProfileActions } from "./ProfileActions";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { ProfileTabs } from "./ProfileTabs";

interface ProfileLayoutProps {
  children: ReactNode;
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const { query } = useRouter();
  const queryScreenName = query.screenName as string;
  const { session } = useAppSession();
  const itsMe = queryScreenName === session?.user.screenName;
  const [contentRef] = useAutoAnimate<HTMLDivElement>({ duration: 200 });
  const userByScreenNameQuery = useQuery({
    queryKey: ["user", queryScreenName],
    queryFn: () => userByScreenName({ screenName: queryScreenName }),
    enabled: !itsMe
  });
  const userLoading = !itsMe ? userByScreenNameQuery.isLoading : false;
  const userData = itsMe ? session?.user : userByScreenNameQuery.data;

  return (
    <Wrapper>
      <ProfileTopBar userData={userData} isLoading={userLoading} />
      <ProfileBanner isLoading={userLoading} src={userData?.profileBannerUrl ?? ""} />
      <ProfileInfoWrapper>
        <FirstRow>
          <ProfileAvatar isLoading={userLoading} src={userData?.profileImageUrl ?? ""} />
          {!userLoading && userData && <ProfileActions itsMe={itsMe} userData={userData} />}
        </FirstRow>
        <Content ref={contentRef}>
          {userLoading && <ProfileSkeleton />}
          {!userLoading && userData && (
            <>
              <NamesRow>
                <Text size="xl" weight={700}>
                  {userData.name}
                </Text>
                <Text color="secondary">@{userData.screenName}</Text>
              </NamesRow>
              {userData.description && (
                <DescriptionRow>
                  <Text>{userData.description}</Text>
                </DescriptionRow>
              )}
              <InfoAndLinksRow>
                {userData.createdAt && (
                  <Text>
                    <CalendarIcon />
                    {getFormattedDate(userData.createdAt)}
                  </Text>
                )}
              </InfoAndLinksRow>
              <FollowsRow>
                <FollowLink href={`/${userData.screenName}/following`}>
                  <span>{0} </span>
                  <span>Following</span>
                </FollowLink>
                <FollowLink href={`/${userData.screenName}/followers`}>
                  <span>{0} </span>
                  <span>Followers</span>
                </FollowLink>
              </FollowsRow>
            </>
          )}
        </Content>
      </ProfileInfoWrapper>
      <ProfileTabs />
      {children}
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NamesRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 1;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoAndLinksRow = styled.div`
  display: inline;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.neutral300};
  margin-left: -3px;

  & > span {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    margin-right: 11px;
    overflow-wrap: break-word;
    line-height: 18px;
    color: inherit;

    & > svg {
      width: 18px;
      height: 18px;
      margin-right: 4px;
    }

    & > a {
      color: ${({ theme }) => theme.primary05};

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const FollowsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
`;

const FollowLink = styled(Link)`
  & > span:last-of-type {
    color: ${({ theme }) => theme.neutral300};
  }
`;
