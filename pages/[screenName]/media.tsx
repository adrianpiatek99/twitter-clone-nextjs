import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";

export interface ProfileMediaPageProps {
  userData?: UserData;
}

const ProfileMedia = ({ userData }: ProfileMediaPageProps) => {
  return (
    <div>
      <NextSeo
        title={`${
          userData ? `Media Tweets by ${userData.name} (@${userData.screenName})` : "Media"
        } / Twitter`}
      />
      media
    </div>
  );
};

export default ProfileMedia;
