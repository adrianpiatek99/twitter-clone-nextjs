import React from "react";

import { NextSeo } from "next-seo";
import { TopBar, TopBarHeading } from "shared/TopBar";

const Messages = () => {
  return (
    <div>
      <NextSeo title="Messages / Twitter" description="Messages" />
      <TopBar>
        <TopBarHeading heading="Messages" />
      </TopBar>
      Messages
    </div>
  );
};

export default Messages;
