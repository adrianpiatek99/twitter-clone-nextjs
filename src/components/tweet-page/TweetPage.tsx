import React from "react";

import { IconButton } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useTweetDetailsQuery } from "hooks/useTweetDetailsQuery";
import { BackIcon } from "icons/index";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { ErrorMessage } from "shared/Messages";
import { TopBar, TopBarHeading } from "shared/TopBar";
import styled from "styled-components";
import { verifyMe } from "utils/session";

import { TweetArticle, TweetArticleSkeleton } from "./TweetArticle";
import { TweetReplies } from "./TweetReplies";

interface TweetPageTemplateProps {
  referer: string;
}

export const TweetPageTemplate = ({ referer }: TweetPageTemplateProps) => {
  const { query, back } = useRouter();
  const { session } = useAppSession();
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const queryTweetId = typeof query.tweetId === "string" ? query.tweetId : "";
  const itsMe = verifyMe(session, queryScreenName);
  const { data, isLoading, isError, error } = useTweetDetailsQuery({
    tweetId: queryTweetId,
    screenName: queryScreenName
  });

  return (
    <Wrapper>
      <NextSeo
        title={`${data ? `${data.author.name} on Twitter: "${data.text}"` : "Tweet"} / Twitter`}
        description="Tweet details"
      />
      <TopBar
        startIcon={
          <IconButton onClick={back} color="white">
            <BackIcon />
          </IconButton>
        }
      >
        <TopBarHeading title={"Tweet"} />
      </TopBar>
      {isError ? (
        <ErrorMessage title={error.message} />
      ) : (
        <Section>
          {isLoading && <TweetArticleSkeleton />}
          {!isLoading && data && (
            <TweetArticle isOwner={itsMe} tweetData={data} referer={referer} />
          )}
        </Section>
      )}
      {!!data && <TweetReplies queryTweetId={queryTweetId} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;
