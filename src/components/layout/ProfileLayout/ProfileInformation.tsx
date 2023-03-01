import React, { memo } from "react";

import { Text } from "components/core";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { CalendarIcon, LinkIcon } from "icons/index";
import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";
import type { UserData } from "types/user";
import { getFormattedDate } from "utils/time";
import { removeHttp } from "utils/url";

interface ProfileInformationProps {
  userData: UserData | undefined;
  isLoading: boolean;
}

export const ProfileInformation = memo(({ userData, isLoading }: ProfileInformationProps) => {
  const [contentRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <Content ref={contentRef}>
      {isLoading && (
        <>
          <NamesRow style={{ gap: "2px" }}>
            <Skeleton width={140} height={22} />
            <Skeleton width={125} height={20} />
          </NamesRow>
          <DescriptionRow style={{ gap: "2px" }}>
            <Skeleton height={15} />
            <Skeleton width={275} height={15} />
          </DescriptionRow>
          <InfoAndLinksRow>
            <Skeleton width={125} height={15} />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
            <Skeleton width={100} height={15} />
          </InfoAndLinksRow>
          <FollowsRow>
            <Skeleton height={14} width={80} />
            <Skeleton height={14} width={80} />
          </FollowsRow>
        </>
      )}
      {userData && (
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
            <Text>
              <CalendarIcon />
              {getFormattedDate(userData.createdAt)}
            </Text>
            {userData.url && (
              <Text>
                <LinkIcon />
                <a
                  target="_blank"
                  href={userData.url}
                  rel="noopener noreferrer"
                  title={userData.url}
                >
                  {removeHttp(userData.url)}
                </a>
              </Text>
            )}
          </InfoAndLinksRow>
          <FollowsRow>
            <FollowLink href={`/${userData.screenName}/following`}>
              <span>{userData._count.following} </span>
              <span>Following</span>
            </FollowLink>
            <FollowLink href={`/${userData.screenName}/followers`}>
              <span>{userData._count.followedBy} </span>
              <span>Followers</span>
            </FollowLink>
          </FollowsRow>
        </>
      )}
    </Content>
  );
});

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const NamesRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 1;
  margin-bottom: 12px;

  word-break: break-word;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const InfoAndLinksRow = styled.div`
  display: inline;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.neutral300};
  margin-left: -1px;
  margin-bottom: 12px;

  & > div {
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    margin-right: 11px;
    overflow-wrap: break-word;
    line-height: 18px;
    color: inherit;
  }

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
  margin-bottom: 12px;
`;

const FollowLink = styled(Link)`
  & > span:last-of-type {
    color: ${({ theme }) => theme.neutral300};
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  }

  &:focus-visible {
    text-decoration: underline;
  }
`;
