import React, { memo, useMemo } from "react";

import {
  LIKES_PAGE_ROUTE,
  MEDIA_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  WITH_REPLIES_PAGE_ROUTE
} from "constants/routes";
import { useRouter } from "next/router";
import { Tab, Tabs } from "shared/Tabs";
import styled from "styled-components";

type ProfileTabs = "tweets" | "replies" | "media" | "likes";

const tabs: { value: ProfileTabs; route: string }[] = [
  { value: "tweets", route: PROFILE_PAGE_ROUTE },
  { value: "replies", route: WITH_REPLIES_PAGE_ROUTE },
  { value: "media", route: MEDIA_PAGE_ROUTE },
  { value: "likes", route: LIKES_PAGE_ROUTE }
];

interface ProfileTabsProps {
  screenName: string;
}

export const ProfileTabs = memo(({ screenName }: ProfileTabsProps) => {
  const { pathname } = useRouter();

  const tabValue = useMemo(() => {
    const tab = tabs.find(({ route }) => route === pathname);

    if (tab) {
      return tab.value;
    }

    return tabs[0]!.value;
  }, [pathname]);

  return (
    <Wrapper>
      <Tabs value={tabValue}>
        {tabs.map(({ value, route }) => (
          <Tab key={value} value={value} href={{ pathname: route, query: { screenName } }} />
        ))}
      </Tabs>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;
