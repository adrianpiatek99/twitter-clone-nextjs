import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { ProfileFollowersTimeline } from "templates/profile-follows-page";

export interface ProfileFollowersPageProps {
  userData: UserData;
}

const ProfileFollowersPage = ({ userData }: ProfileFollowersPageProps) => {
  return <ProfileFollowersTimeline userData={userData} />;
};

export default ProfileFollowersPage;
