import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { NextSeo } from "next-seo";

export interface ProfileWithRepliesPageProps {
  userData?: UserData;
}

const ProfileWithReplies = ({ userData }: ProfileWithRepliesPageProps) => {
  return (
    <div>
      <NextSeo
        title={`${
          userData
            ? `Tweets with replies by ${userData.name} (@${userData.screenName})`
            : "Tweets with replies"
        } / Twitter`}
      />
      with_replies
    </div>
  );
};

export default ProfileWithReplies;
