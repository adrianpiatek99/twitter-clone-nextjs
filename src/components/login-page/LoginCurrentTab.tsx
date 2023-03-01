import React from "react";

import type { LoginTabs } from "./LoginPage";
import { LoginSignInForm } from "./LoginSignInForm/LoginSignInForm";
import { LoginSignUpForm } from "./LoginSignUpForm/LoginSignUpForm";

interface LoginCurrentTabProps {
  currentTab: LoginTabs;
  handleChangeTab: (tab: LoginTabs) => void;
}

export const LoginCurrentTab = ({ currentTab, handleChangeTab }: LoginCurrentTabProps) => {
  if (currentTab === "sign up") {
    return <LoginSignUpForm handleChangeTab={handleChangeTab} />;
  }

  return <LoginSignInForm />;
};
