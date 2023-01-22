import React from "react";

import { ProfilePageProps } from "pages/[screenName]";

export const ProfilePageTemplate = ({ userData }: ProfilePageProps) => {
  console.log("userData", userData);

  return <div>{userData.screenName}</div>;
};
