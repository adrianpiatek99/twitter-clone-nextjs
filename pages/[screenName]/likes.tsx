import React from "react";

import { ProfileLikes } from "components/profile-page/ProfileLikes";
import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileLikesPage = ({ userData }: ProfilePageProps) => {
  return (
    <>
      <NextSeo
        title={`${
          userData ? `Tweets liked by ${userData.name} (@${userData.screenName})` : "Likes"
        } / Twitter`}
        description="Profile likes"
      />
      {userData && <ProfileLikes userData={userData} />}
    </>
  );
};

export default ProfileLikesPage;
