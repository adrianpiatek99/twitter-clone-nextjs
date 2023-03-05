import React from "react";

import { HomeTimeline, HomeTopBar } from "components/home-page";
import { useAppSession } from "hooks/useAppSession";
import { NextSeo } from "next-seo";
import { CreateTweetForm } from "shared/Forms";

const Home = () => {
  const { session } = useAppSession();

  return (
    <>
      <NextSeo title="Home / Twitter" description="Home" />
      <HomeTopBar />
      {session && <CreateTweetForm />}
      <HomeTimeline />
    </>
  );
};

export default Home;
