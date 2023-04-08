import React, { useEffect } from "react";

import { NextSeo } from "next-seo";
import useProfilePageStore from "store/profilePageStore";

import type { ProfilePageProps } from ".";

const ProfileMedia = ({ userData }: ProfilePageProps) => {
  const changeTopBarSubheading = useProfilePageStore(state => state.changeTopBarSubheading);

  useEffect(() => {
    if (userData) {
      changeTopBarSubheading(`0 Photos & videos`);
    }
  }, [userData]);

  return (
    <div>
      <NextSeo
        title={`${
          userData ? `Media Tweets by ${userData.name} (@${userData.screenName})` : "Media"
        } / Twitter`}
        description="Profile media"
      />
      <p>Media</p>
    </div>
  );
};

export default ProfileMedia;
