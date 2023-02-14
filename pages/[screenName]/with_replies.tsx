import React from "react";

import { NextSeo } from "next-seo";

import type { ProfilePageProps } from ".";

const ProfileWithReplies = ({ userData }: ProfilePageProps) => {
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
      with_replies
    </div>
  );
};

export default ProfileWithReplies;
