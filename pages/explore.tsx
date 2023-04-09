import React from "react";

import { NextSeo } from "next-seo";
import { TopBar, TopBarHeading } from "shared/TopBar";

const Explore = () => {
  return (
    <div>
      <NextSeo title="Explore / Twitter" description="Explore" />
      <TopBar>
        <TopBarHeading heading="Explore" />
      </TopBar>
      Explore
    </div>
  );
};

export default Explore;
