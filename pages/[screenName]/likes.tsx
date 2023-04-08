import React, { lazy, Suspense, useEffect } from "react";

import { NextSeo } from "next-seo";
import { TweetCellSkeletons } from "shared/TweetCell";
import useProfilePageStore from "store/profilePageStore";

import type { ProfilePageProps } from ".";

const LazyProfileLikesTimeline = lazy(() =>
  import("components/profile-page").then(mod => ({ default: mod.ProfileLikesTimeline }))
);

const ProfileLikes = ({ userData }: ProfilePageProps) => {
  const changeTopBarSubheading = useProfilePageStore(state => state.changeTopBarSubheading);

  useEffect(() => {
    if (userData) {
      const likesCount = userData._count.likes;

      changeTopBarSubheading(`${likesCount} Likes`);
    }
  }, [userData]);

  return (
    <>
      <NextSeo
        title={`${
          userData ? `Tweets liked by ${userData.name} (@${userData.screenName})` : "Likes"
        } / Twitter`}
        description="Profile likes"
      />
      <Suspense fallback={<TweetCellSkeletons />}>
        {userData && <LazyProfileLikesTimeline userData={userData} />}
      </Suspense>
    </>
  );
};

export default ProfileLikes;
