import React from "react";

import { TweetPageTemplate } from "components/tweet-page";
import type { GetServerSideProps } from "next";

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
