import React from "react";

import type { UserData } from "api/user/userByScreenName";
import { ProfilePageTemplate } from "templates/profile-page";

export interface ProfilePageProps {
  userData: UserData;
}

const Profile = ({ userData }: ProfilePageProps) => {
  if (!userData) {
    return null;
  }

  return <ProfilePageTemplate userData={userData} />;
};

export default Profile;
