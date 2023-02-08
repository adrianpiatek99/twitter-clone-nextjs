import React from "react";

import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileLikes = ({ userData }: ProfilePageProps) => {
  return (
    <div>
      <NextSeo
        title={`${
          userData ? `Tweets liked by ${userData.name} (@${userData.screenName})` : "Likes"
        } / Twitter`}
      />
      likes
    </div>
  );
};

export default ProfileLikes;
