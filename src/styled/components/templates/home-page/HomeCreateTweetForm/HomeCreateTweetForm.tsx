import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import { TWEET_MAX_LENGTH, tweetSchema, TweetValues } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";

import { HomeCreateTweetToolbar } from "./HomeCreateTweetToolbar";

export const HomeCreateTweetForm = () => {
  const { session, isUnauthenticated } = useAppSession();

  if (isUnauthenticated || !session) return null;

  const {
    user: { screenName, profileImageUrl }
  } = session;
  const { register, handleSubmit, watch, reset } = useForm<TweetValues>({
    resolver: yupResolver(tweetSchema),
    defaultValues: {
      text: ""
    }
  });
  const tweetValue = watch("text");
  const { handleCreateTweet, createTweetLoading } = useCreateTweetMutation({
    onSettled: () => {
      reset();
    }
  });

  const onSubmit: SubmitHandler<TweetValues> = data => {
    handleCreateTweet({ ...data, imageUrls: [] });
  };

  return (
    <Wrapper>
      <LeftColumn>
        <Avatar src={profileImageUrl} screenName={screenName} size="large" />
      </LeftColumn>
      <RightColumn>
        <Textarea
          value={tweetValue}
          placeholder="What's happening?"
          maxLength={TWEET_MAX_LENGTH}
          {...register("text")}
        />
        <HomeCreateTweetToolbar
          tweetLength={tweetValue?.length ?? 0}
          onSubmit={handleSubmit(onSubmit)}
          loading={createTweetLoading}
        />
      </RightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 4px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;
`;