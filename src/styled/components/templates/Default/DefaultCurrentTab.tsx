import React from "react";

import { DefaultTabs } from "./DefaultPage";
import { DefaultSignInForm } from "./DefaultSignInForm";
import { DefaultSignUpForm } from "./DefaultSignUpForm";

interface DefaultCurrentTabProps {
  currentTab: DefaultTabs;
  handleChangeTab: (tab: DefaultTabs) => void;
}

export const DefaultCurrentTab = ({ currentTab, handleChangeTab }: DefaultCurrentTabProps) => {
  if (currentTab === "sign up") {
    return <DefaultSignUpForm handleChangeTab={handleChangeTab} />;
  }

  return <DefaultSignInForm />;
};
