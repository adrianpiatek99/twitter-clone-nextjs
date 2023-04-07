import React, { useEffect } from "react";

import { ProfileLikesTimeline } from "components/profile-page";
import { NextSeo } from "next-seo";
import useProfilePageStore from "store/profilePageStore";

import type { ProfilePageProps } from ".";

const ProfileLikes = ({ userData }: ProfilePageProps) => {
  const changeTopBarSubheading = useProfilePageStore(state => state.changeTopBarSubheading);

  useEffect(() => {
    if (userData) {
      const likesCount = userData._count.likes;

      changeTopBarSubheading(`${likesCount} Likes`);
    }
  }, [userData, changeTopBarSubheading]);

  return (
    <>
      <NextSeo
        title={`${
          userData ? `Tweets liked by ${userData.name} (@${userData.screenName})` : "Likes"
        } / Twitter`}
        description="Profile likes"
      />
      {userData && <ProfileLikesTimeline userData={userData} />}
    </>
  );
};

export default ProfileLikes;
