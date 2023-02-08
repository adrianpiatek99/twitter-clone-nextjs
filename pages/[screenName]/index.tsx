import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";
import { ProfileTimeline } from "templates/profile-page";

export interface ProfilePageProps {
  userData?: UserData;
}

const Profile = ({ userData }: ProfilePageProps) => {
  return (
    <>
      <NextSeo
        title={`${userData ? `${userData.name} (@${userData.screenName})` : "Profile"} / Twitter`}
      />
      {userData && <ProfileTimeline userData={userData} />}
    </>
  );
};

export default Profile;
