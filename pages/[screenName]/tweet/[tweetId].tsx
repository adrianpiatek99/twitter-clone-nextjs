import React from "react";

import type { GetServerSideProps } from "next";
import { TweetPageTemplate } from "templates/tweet-page";

interface TweetPageProps {
  referer: string;
}

const TweetPage = ({ referer }: TweetPageProps) => {
  return <TweetPageTemplate referer={referer} />;
};

export const getServerSideProps: GetServerSideProps<TweetPageProps> = async context => {
  return {
    props: {
      referer: context.req.headers.referer || "/home"
    }
  };
};

export default TweetPage;
