import React from "react";

import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileMedia = ({ userData }: ProfilePageProps) => {
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
