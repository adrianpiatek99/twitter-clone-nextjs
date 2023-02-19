import React from "react";

import { ProfileFollowersTimeline } from "components/follows-page";
import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileFollowersPage = ({ userData }: ProfilePageProps) => {
  return (
    <>
      <NextSeo
        title={`${
          userData ? `People following ${userData.name} (@${userData.screenName})` : "Followers"
        } / Twitter`}
        description="Followers"
      />
      {userData && <ProfileFollowersTimeline userData={userData} />}
    </>
  );
};

export default ProfileFollowersPage;
