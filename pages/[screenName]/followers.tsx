import React from "react";

import { NextSeo } from "next-seo";
import { ProfileFollowersTimeline } from "templates/follows-page";

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
