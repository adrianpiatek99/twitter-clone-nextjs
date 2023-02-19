import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { ProfileTimeline } from "components/profile-page";
import { NextSeo } from "next-seo";

export interface ProfilePageProps {
  userData?: UserData;
}

const ProfilePage = ({ userData }: ProfilePageProps) => {
  return (
    <>
      <NextSeo
        title={`${userData ? `${userData.name} (@${userData.screenName})` : "Profile"} / Twitter`}
        description="Profile"
      />
      {userData && <ProfileTimeline userData={userData} />}
    </>
  );
};

export default ProfilePage;
