import React from "react";

import { HomePageTemplate } from "components/home-page";
import { NextSeo } from "next-seo";

const Home = () => {
  return (
    <>
      <NextSeo title="Home / Twitter" description="Home" />
      <HomePageTemplate />
    </>
  );
};

export default Home;
