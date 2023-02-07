import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import type { TweetData } from "api/tweet/timelineTweets";
import { Modal, Text, Textarea } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useReplyTweetMutation } from "hooks/useReplyTweetMutation";
import type { TweetValues } from "schema/tweetSchema";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { tweetSchema } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import styled, { css } from "styled-components";

import { ReplyTweetModalAuthor } from "./ReplyTweetModalAuthor";

interface ReplyTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  tweetData: TweetData;
}

export const ReplyTweetModal = ({ isOpen, onClose, tweetData }: ReplyTweetModalProps) => {
  const tweetId = tweetData.id;
  const { session } = useAppSession();
  const { register, handleSubmit, watch, reset } = useForm<TweetValues>({
    resolver: yupResolver(tweetSchema),
    defaultValues: {
      text: ""
    }
  });
  const { handleReplyTweet, replyTweetLoading } = useReplyTweetMutation({
    tweetId,
    onSuccess: () => {
      reset();
      onClose();
    }
  });
  const tweetValue = watch("text");
  const tweetLength = tweetValue?.length ?? 0;

  const onSubmit: SubmitHandler<TweetValues> = data => {
    handleReplyTweet({ tweetId, ...data });
  };

  if (!session) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleSubmit(onSubmit)}
      acceptButtonText="Reply"
      loading={replyTweetLoading}
    >
      <Content isLoading={replyTweetLoading}>
        <ReplyTweetModalAuthor tweetData={tweetData} />
        <Inner>
          <LeftColumn>
            <Avatar src={session.user.profileImageUrl} size="large" />
          </LeftColumn>
          <RightColumn>
            <Textarea
              value={tweetValue}
              placeholder="Tweet your reply"
              maxLength={TWEET_MAX_LENGTH}
              disabled={replyTweetLoading}
              {...register("text")}
            />
            <Toolbar>
              {!!tweetLength && (
                <Text size="s" color="secondary">
                  {tweetLength} / {TWEET_MAX_LENGTH}
                </Text>
              )}
            </Toolbar>
          </RightColumn>
        </Inner>
      </Content>
    </Modal>
  );
};

const Content = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  padding: 4px 16px;
  gap: 12px;
  transition: opacity 0.2s;
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

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0 10px;
  min-height: 34px;
`;
