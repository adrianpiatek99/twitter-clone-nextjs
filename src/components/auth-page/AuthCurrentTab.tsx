import React from "react";

import useAuthPageStore from "store/authPageStore";

import { AuthSignInForm } from "./AuthSignInForm/AuthSignInForm";
import { AuthSignUpForm } from "./AuthSignUpForm/AuthSignUpForm";

export const AuthCurrentTab = () => {
  const currentTab = useAuthPageStore(state => state.currentTab);

  if (currentTab === "sign up") {
    return <AuthSignUpForm />;
  }

  return <AuthSignInForm />;
};
