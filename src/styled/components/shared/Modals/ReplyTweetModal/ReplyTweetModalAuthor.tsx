import React from "react";

import { Text } from "components/core";
import { Avatar } from "shared/Avatar";
import styled, { useTheme } from "styled-components";
import type { TweetData } from "types/tweet";
import { getRelativeTime } from "utils/time";

interface ReplyTweetModalAuthorProps {
  tweetData: TweetData;
}

export const ReplyTweetModalAuthor = ({
  tweetData: {
    author: { name, screenName, profileImageUrl },
    createdAt,
    text
  }
}: ReplyTweetModalAuthorProps) => {
  const { primary05 } = useTheme();

  return (
    <Inner>
      <LeftColumn>
        <Avatar src={profileImageUrl} size="large" />
        <Line />
      </LeftColumn>
      <RightColumn>
        <Row>
          <Text weight={700} href={`/${screenName}`} truncate>
            {name}
          </Text>
          <Text color="secondary" href={`/${screenName}`} truncate>
            @{screenName}
          </Text>
          <Text color="secondary" truncate>
            ·
          </Text>
          <Text color="secondary" href={`/${screenName}`}>
            {getRelativeTime(createdAt)}
          </Text>
        </Row>
        <TweetText>
          <Text truncate>{text}</Text>
        </TweetText>
        <ReplyingToRow>
          <Text color="secondary">
            Replying to <Text customColor={primary05}>@{screenName}</Text>
          </Text>
        </ReplyingToRow>
      </RightColumn>
    </Inner>
  );
};

const Inner = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 4px 16px;
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  justify-items: center;
`;

const Line = styled.div`
  display: flex;
  width: 2px;
  margin-top: 8px;
  min-height: 12px;
  background-color: ${({ theme }) => theme.border2};
  border-radius: 16px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0px;
`;

const TweetText = styled.div`
  display: inline-block;
  width: 98%;
  max-height: 550px;
  margin-top: 2px;
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

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
`;

const ReplyingToRow = styled.div`
  display: flex;
  padding: 8px 0px 12px 0px;
`;
