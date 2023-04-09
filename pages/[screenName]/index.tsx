import React, { lazy, Suspense } from "react";

import { NextSeo } from "next-seo";
import { TweetCellSkeletons } from "shared/TweetCell";
import type { UserData } from "types/user";

const LazyProfileTimeline = lazy(() =>
  import("components/profile-page").then(mod => ({ default: mod.ProfileTimeline }))
);

export interface ProfilePageProps {
  userData: UserData | undefined;
}

const Profile = ({ userData }: ProfilePageProps) => {
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
