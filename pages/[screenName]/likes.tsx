import React from "react";

import { NextSeo } from "next-seo";
import { ProfileLikes } from "templates/profile-page/ProfileLikes";

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
