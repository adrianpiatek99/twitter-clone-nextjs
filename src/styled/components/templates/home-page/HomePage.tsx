import React from "react";

import { useAppSession } from "hooks/useAppSession";

import { HomeCreateTweetForm } from "./HomeCreateTweetForm";
import { HomeTimeline } from "./HomeTimeline";
import { HomeTopBar } from "./HomeTopBar";

export const HomePageTemplate = () => {
  const { session } = useAppSession();

  return (
    <>
      <HomeTopBar />
      {session && <HomeCreateTweetForm userData={session.user} />}
      <HomeTimeline />
    </>
  );
};
