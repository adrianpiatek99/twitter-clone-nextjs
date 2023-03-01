import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Textarea } from "components/core";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import { useRouter } from "next/router";
import type { TweetValues } from "schema/tweetSchema";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { tweetSchema } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import styled, { css } from "styled-components";

import { CreateTweetModalToolbar } from "./CreateTweetModalToolbar";

interface CreateTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImageUrl: string;
}

export const CreateTweetModal = ({ isOpen, onClose, profileImageUrl }: CreateTweetModalProps) => {
  const { push } = useRouter();
  const { register, handleSubmit, watch, reset } = useForm<TweetValues>({
    resolver: zodResolver(tweetSchema),
    defaultValues: {
      text: ""
    }
  });
  const tweetValue = watch("text");
  const { handleCreateTweet, createTweetLoading } = useCreateTweetMutation({
    onSuccess: ({ id, author: { screenName } }) => {
      push({ pathname: "/[screenName]/tweet/[tweetId]", query: { tweetId: id, screenName } });
      reset();
      onClose();
    }
  });

  const onSubmit: SubmitHandler<TweetValues> = data => {
    handleCreateTweet({ ...data });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleSubmit(onSubmit)}
      acceptButtonText="Create"
      loading={createTweetLoading}
    >
      <Inner isLoading={createTweetLoading}>
        <LeftColumn>
          <Avatar src={profileImageUrl} size="large" />
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
          <CreateTweetModalToolbar tweetLength={tweetValue?.length ?? 0} />
        </RightColumn>
      </Inner>
    </Modal>
  );
};

const Inner = styled.div<{ isLoading: boolean }>`
  display: flex;
  width: 100%;
  padding: 12px 16px;
  gap: 12px;
  min-height: 275px;
  transition: opacity 0.2s;

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
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
