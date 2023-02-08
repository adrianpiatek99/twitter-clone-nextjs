import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";
import { ProfileFollowersTimeline } from "templates/follows-page";

export interface ProfileFollowersPageProps {
  userData?: UserData;
}

const ProfileFollowersPage = ({ userData }: ProfileFollowersPageProps) => {
  return (
    <>
      <NextSeo
        title={`${
          userData ? `People following ${userData.name} (@${userData.screenName})` : "Followers"
        } / Twitter`}
      />
      {userData && <ProfileFollowersTimeline userData={userData} />}
    </>
  );
};

export default ProfileFollowersPage;
