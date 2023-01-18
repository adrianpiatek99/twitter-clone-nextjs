import React from "react";

import { HomeCreateTweetForm } from "./HomeCreateTweetForm";
import { HomeTopBar } from "./HomeTopBar";

export const HomePageTemplate = () => {
  return (
    <>
      <HomeTopBar />
      <HomeCreateTweetForm />
    </>
  );
};
