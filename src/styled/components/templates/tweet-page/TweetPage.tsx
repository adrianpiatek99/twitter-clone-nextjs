import React from "react";

import { IconButton } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useTweetDetailsQuery } from "hooks/useTweetDetailsQuery";
import BackIcon from "icons/BackIcon";
import { useRouter } from "next/router";
import { ErrorMessage } from "shared/ErrorMessage";
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
  const [sectionRef] = useAutoAnimate<HTMLTableSectionElement>({ duration: 100 });
  const queryScreenName = typeof query.screenName === "string" ? query.screenName : "";
  const queryTweetId = typeof query.tweetId === "string" ? query.tweetId : "";
  const itsMe = verifyMe(session, queryScreenName);
  const { data, isLoading, isError, error } = useTweetDetailsQuery({
    tweetId: queryTweetId,
    screenName: queryScreenName
  });

  return (
    <Wrapper>
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
        <ErrorMessage message={error.message} />
      ) : (
        <Section ref={sectionRef}>
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
