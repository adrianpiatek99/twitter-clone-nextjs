import React from "react";

import { NextSeo } from "next-seo";
import { HomePageTemplate } from "templates/home-page";

const Home = () => {
  return (
    <>
      <NextSeo title="Home / Twitter" />
      <HomePageTemplate />
    </>
  );
};

export default Home;
