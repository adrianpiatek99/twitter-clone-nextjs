import React, { lazy, Suspense } from "react";

import { NextSeo } from "next-seo";
import { TweetCellSkeletons } from "shared/TweetCell";

import type { ProfilePageProps } from ".";

const LazyProfileLikesTimeline = lazy(() =>
  import("components/profile-page").then(mod => ({ default: mod.ProfileLikesTimeline }))
);

const ProfileLikes = ({ userData }: ProfilePageProps) => {
  // const likesCount = userData._count.likes;

  // changeTopBarSubheading(`${likesCount} Likes`);

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
