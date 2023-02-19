import type { ComponentPropsWithRef, Ref } from "react";
import { memo } from "react";
import { forwardRef } from "react";
import React from "react";

import type { ReplyData } from "api/tweet/replyTweet";
import { Text } from "components/core";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import styled, { useTheme } from "styled-components";

import { TweetReplyCellFirstRow } from "./TweetReplyCellFirstRow";

interface TweetReplyCellProps extends ComponentPropsWithRef<"div"> {
  replyData: ReplyData;
  start: number;
}

export const TweetReplyCell = memo(
  forwardRef(({ replyData, start, ...props }: TweetReplyCellProps, ref: Ref<HTMLDivElement>) => {
    const {
      text,
      author: { profileImageUrl, screenName },
      tweet
    } = replyData;
    const { primary05 } = useTheme();

    return (
      <ReplyActionCard
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${start}px)`
        }}
        {...props}
        ref={ref}
      >
        <Inner>
          <LeftColumn>
            <Avatar src={profileImageUrl} screenName={screenName} size="large" />
          </LeftColumn>
          <RightColumn>
            <TweetReplyCellFirstRow replyData={replyData} />
            <Text color="secondary">
              Replying to{" "}
              <Text href={`/${screenName}`} customColor={primary05}>
                @{tweet.author.screenName}
              </Text>
            </Text>
            <ReplyText>
              <Text truncate>{text}</Text>
            </ReplyText>
          </RightColumn>
        </Inner>
      </ReplyActionCard>
    );
  })
);

const ReplyActionCard = styled(ActionCard)`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: default;
`;

const Inner = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  min-width: 0px;
`;

const ReplyText = styled.div`
  display: inline-block;
  width: 98%;
  max-height: 550px;
  white-space: pre-line;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > span {
    display: inline-block;
    white-space: pre-line;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
