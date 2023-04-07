import React, { useEffect } from "react";

import { ProfileTimeline } from "components/profile-page";
import { NextSeo } from "next-seo";
import useProfilePageStore from "store/profilePageStore";
import type { UserData } from "types/user";

export interface ProfilePageProps {
  userData: UserData | undefined;
}

const Profile = ({ userData }: ProfilePageProps) => {
  const changeTopBarSubheading = useProfilePageStore(state => state.changeTopBarSubheading);

  useEffect(() => {
    if (userData) {
      const tweetCount = userData._count.tweets;

      changeTopBarSubheading(`${tweetCount} Tweets`);
    }
  }, [userData, changeTopBarSubheading]);

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

export default Profile;
