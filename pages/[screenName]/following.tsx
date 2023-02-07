import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { ProfileFollowingTimeline } from "templates/follows-page";

export interface ProfileFollowingPageProps {
  userData: UserData;
}

export const ProfileFollowingPage = ({ userData }: ProfileFollowingPageProps) => {
  return <ProfileFollowingTimeline userData={userData} />;
};

export default ProfileFollowingPage;
