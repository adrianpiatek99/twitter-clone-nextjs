import React, { lazy, Suspense, useEffect } from "react";

import { TweetArticle, TweetArticleSkeleton, TweetTopBar } from "components/tweet-page";
import { useAppSession } from "hooks/useAppSession";
import { useTweetDetailsQuery } from "hooks/useTweetDetailsQuery";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { ErrorMessage } from "shared/Messages";
import useTweetPageStore from "store/tweetPageStore";
import styled from "styled-components";
import { verifyMe } from "utils/session";

const LazyTweetReplies = lazy(() =>
  import("components/tweet-page").then(mod => ({ default: mod.TweetReplies }))
);

interface TweetPageProps {
  referer: string;
}

const Tweet = ({ referer }: TweetPageProps) => {
  const { query } = useRouter();
  const { session } = useAppSession();
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const queryTweetId = typeof query.tweetId === "string" ? query.tweetId : "";
  const isOwner = verifyMe(session, queryScreenName);
  const setReferer = useTweetPageStore(state => state.setReferer);
  const { data, isLoading, isError, error } = useTweetDetailsQuery({
    tweetId: queryTweetId
  });

  useEffect(() => {
    if (referer) {
      setReferer(referer);
    }
  }, [referer, setReferer]);

  return (
    <>
      <NextSeo
        title={`${data ? `${data.author.name} on Twitter: "${data.text}"` : "Tweet"} / Twitter`}
        description="Tweet details"
      />
      <Wrapper>
        <TweetTopBar />
        {isError ? (
          <ErrorMessage title={error.message} />
        ) : (
          <Section>
            {isLoading && <TweetArticleSkeleton />}
            {!isLoading && data && <TweetArticle isOwner={isOwner} tweetData={data} />}
          </Section>
        )}
        <Suspense>{!!data && <LazyTweetReplies tweetId={data.id} />}</Suspense>
      </Wrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TweetPageProps> = async context => {
  return {
    props: {
      referer: context.req.headers.referer || "/home"
    }
  };
};

export default Tweet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;
