import React from "react";

import { NextSeo } from "next-seo";
import { TopBar, TopBarHeading } from "shared/TopBar";

const Bookmarks = () => {
  return (
    <div>
      <NextSeo title="Bookmarks / Twitter" description="Bookmarks" />
      <TopBar>
        <TopBarHeading heading="Bookmarks" />
      </TopBar>
      Bookmarks
    </div>
  );
};

export default Bookmarks;
