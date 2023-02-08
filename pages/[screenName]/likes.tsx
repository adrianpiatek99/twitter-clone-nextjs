import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";

export interface ProfileLikesPageProps {
  userData?: UserData;
}

const ProfileLikes = ({ userData }: ProfileLikesPageProps) => {
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
