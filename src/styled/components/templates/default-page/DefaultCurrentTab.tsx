import React from "react";

import type { DefaultTabs } from "./DefaultPage";
import { DefaultSignInForm } from "./DefaultSignInForm/DefaultSignInForm";
import { DefaultSignUpForm } from "./DefaultSignUpForm/DefaultSignUpForm";

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
