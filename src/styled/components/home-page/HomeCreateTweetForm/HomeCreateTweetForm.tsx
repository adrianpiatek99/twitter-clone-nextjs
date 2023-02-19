import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import type { UserData } from "api/user/userByScreenName";
import { Textarea } from "components/core";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import type { TweetValues } from "schema/tweetSchema";
import { TWEET_MAX_LENGTH, tweetSchema } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";

import { HomeCreateTweetToolbar } from "./HomeCreateTweetToolbar";

interface HomeCreateTweetFormProps {
  userData: UserData;
}

export const HomeCreateTweetForm = ({
  userData: { screenName, profileImageUrl }
}: HomeCreateTweetFormProps) => {
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
          label="Create a tweet"
          value={tweetValue}
          placeholder="What's happening?"
          maxLength={TWEET_MAX_LENGTH}
          disabled={createTweetLoading}
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
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    border-top: 1px solid ${({ theme }) => theme.border};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 4px;
  }
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
