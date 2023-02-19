import React, { memo, useMemo } from "react";

import { useRouter } from "next/router";
import { Tab, Tabs } from "shared/Tabs";
import styled from "styled-components";

type ProfileTabs = "tweets" | "tweets & replies" | "media" | "likes";

const tabs: { value: ProfileTabs; linkTo: string }[] = [
  { value: "tweets", linkTo: "" },
  { value: "tweets & replies", linkTo: "with_replies" },
  { value: "media", linkTo: "media" },
  { value: "likes", linkTo: "likes" }
];

interface ProfileTabsProps {
  screenName: string;
}

export const ProfileTabs = memo(({ screenName }: ProfileTabsProps) => {
  const { pathname } = useRouter();

  const tabValue = useMemo(() => {
    const profilePathname = "/[screenName]/";

    const profilePage = pathname.replace(profilePathname, "");
    const tab = tabs.find(({ linkTo }) => linkTo === profilePage);

    if (tab) {
      return tab.value;
    }

    return tabs[0]!.value;
  }, [pathname]);

  return (
    <Wrapper>
      <Tabs value={tabValue}>
        {tabs.map(({ value, linkTo }) => (
          <Tab key={value} value={value} linkProps={{ href: `/${screenName}/${linkTo}` }} />
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
