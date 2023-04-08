import React, { lazy, Suspense, useEffect } from "react";

import { NextSeo } from "next-seo";
import { TweetCellSkeletons } from "shared/TweetCell";
import useProfilePageStore from "store/profilePageStore";
import type { UserData } from "types/user";

const LazyProfileTimeline = lazy(() =>
  import("components/profile-page").then(mod => ({ default: mod.ProfileTimeline }))
);

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
  }, [userData]);

  return (
    <>
      <NextSeo
        title={`${userData ? `${userData.name} (@${userData.screenName})` : "Profile"} / Twitter`}
        description="Profile"
      />
      <Suspense fallback={<TweetCellSkeletons />}>
        {userData && <LazyProfileTimeline userData={userData} />}
      </Suspense>
    </>
  );
};

export default Profile;
