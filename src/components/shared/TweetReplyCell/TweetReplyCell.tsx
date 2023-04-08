import type { ComponentPropsWithRef, Ref } from "react";
import { memo } from "react";
import { forwardRef } from "react";
import React from "react";

import { Text } from "components/core";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import styled, { useTheme } from "styled-components";
import type { ReplyData } from "types/tweetReply";
import { profilePageHref } from "utils/hrefs";

import { TweetReplyCellFirstRow } from "./TweetReplyCellFirstRow";

interface TweetReplyCellProps extends ComponentPropsWithRef<"div"> {
  replyData: ReplyData;
}

export const TweetReplyCell = memo(
  forwardRef(({ replyData, ...props }: TweetReplyCellProps, ref: Ref<HTMLDivElement>) => {
    const {
      text,
      author: { profileImageUrl, screenName },
      tweet
    } = replyData;
    const { primary05 } = useTheme();

    return (
      <ReplyActionCard {...props} ref={ref}>
        <Inner>
          <LeftColumn>
            <Avatar src={profileImageUrl} screenName={screenName} size="large" />
          </LeftColumn>
          <RightColumn>
            <TweetReplyCellFirstRow replyData={replyData} />
            <Text color="secondary">
              Replying to{" "}
              <Text href={profilePageHref(tweet.author.screenName)} customColor={primary05}>
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
