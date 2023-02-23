import React from "react";

import { Text } from "components/core";
import styled from "styled-components";
import type { ReplyData } from "types/tweetReply";
import { getRelativeTime } from "utils/time";

interface TweetReplyCellFirstRowProps {
  replyData: ReplyData;
}

export const TweetReplyCellFirstRow = ({
  replyData: {
    createdAt,
    author: { name, screenName }
  }
}: TweetReplyCellFirstRowProps) => {
  return (
    <Wrapper>
      <LeftColumn>
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
      </LeftColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: ${({ theme }) => theme.neutral300};
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  z-index: 1;
`;
