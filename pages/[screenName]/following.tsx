import React from "react";

import { NextSeo } from "next-seo";
import { ProfileFollowingTimeline } from "templates/follows-page";

import type { ProfilePageProps } from ".";

export const ProfileFollowingPage = ({ userData }: ProfilePageProps) => {
  return (
    <>
      <NextSeo
        title={`${
          userData ? `People followed by ${userData.name} (@${userData.screenName})` : "Following"
        } / Twitter`}
        description="Following"
      />
      {userData && <ProfileFollowingTimeline userData={userData} />}
    </>
  );
};

export default ProfileFollowingPage;
