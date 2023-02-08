import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";
import { ProfileFollowingTimeline } from "templates/follows-page";

export interface ProfileFollowingPageProps {
  userData?: UserData;
}

export const ProfileFollowingPage = ({ userData }: ProfileFollowingPageProps) => {
  return (
    <>
      <NextSeo
        title={`${
          userData ? `People followed by ${userData.name} (@${userData.screenName})` : "Following"
        } / Twitter`}
      />
      {userData && <ProfileFollowingTimeline userData={userData} />}
    </>
  );
};

export default ProfileFollowingPage;
