import React from "react";

import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileWithReplies = ({ userData }: ProfilePageProps) => {
  // const tweetCount = userData._count.tweets;

  // changeTopBarSubheading(`${tweetCount} Tweets`);

  return (
    <div>
      <NextSeo
        title={`${
          userData
            ? `Tweets with replies by ${userData.name} (@${userData.screenName})`
            : "Tweets with replies"
        } / Twitter`}
        description="Profile tweets with replies"
      />
      <p>Replies</p>
    </div>
  );
};

export default ProfileWithReplies;
