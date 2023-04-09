import React from "react";

import { NextSeo } from "next-seo";
import { TopBar, TopBarHeading } from "shared/TopBar";

const Notifications = () => {
  return (
    <div>
      <NextSeo title="Notifications / Twitter" description="Notifications" />
      <TopBar>
        <TopBarHeading heading="Notifications" />
      </TopBar>
      Notifications
    </div>
  );
};

export default Notifications;
