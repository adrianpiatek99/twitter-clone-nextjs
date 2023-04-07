import React, { useEffect } from "react";

import { NextSeo } from "next-seo";
import useProfilePageStore from "store/profilePageStore";

import type { ProfilePageProps } from ".";

const ProfileWithReplies = ({ userData }: ProfilePageProps) => {
  const changeTopBarSubheading = useProfilePageStore(state => state.changeTopBarSubheading);

  useEffect(() => {
    if (userData) {
      const tweetCount = userData._count.tweets;

      changeTopBarSubheading(`${tweetCount} Tweets`);
    }
  }, [userData, changeTopBarSubheading]);

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
