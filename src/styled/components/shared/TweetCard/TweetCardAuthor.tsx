import React, { useState } from "react";

import { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import styled from "styled-components";
import { getRelativeTime } from "utils/timeUtils";

import { TweetCardMenu } from "./TweetCardMenu";

interface TweetCardAuthorProps extends Pick<TweetData, "createdAt" | "author"> {
  tweetId: TweetData["id"];
  isOwner: boolean;
}

export const TweetCardAuthor = ({
  tweetId,
  createdAt,
  author: { name, screenName },
  isOwner
}: TweetCardAuthorProps) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

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
      {isOwner && (
        <RightColumn>
          <IconButton onClick={() => setIsMenuModalOpen(prev => !prev)} color="secondary">
            <MoreHorizontalIcon />
          </IconButton>
        </RightColumn>
      )}
      <TweetCardMenu
        tweetId={tweetId}
        isOwner={isOwner}
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  color: ${({ theme }) => theme.neutral300};
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin: -8px -6px -8px;
`;
