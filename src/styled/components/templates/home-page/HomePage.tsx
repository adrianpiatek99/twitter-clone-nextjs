import React from "react";

import { HomeCreateTweetForm } from "./HomeCreateTweetForm";
import { HomeTimeline } from "./HomeTimeline";
import { HomeTopBar } from "./HomeTopBar";

export const HomePageTemplate = () => {
  return (
    <>
      <HomeTopBar />
      <HomeCreateTweetForm />
      <HomeTimeline />
    </>
  );
};
