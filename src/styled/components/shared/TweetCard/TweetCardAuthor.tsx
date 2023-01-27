import React, { useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import type { UseDeleteTweetMutationReturn } from "hooks/useDeleteTweetMutation";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import styled from "styled-components";
import { getRelativeTime } from "utils/timeUtils";

import { TweetCardMenu } from "./TweetCardMenu";

interface TweetCardAuthorProps {
  isOwner: boolean;
  tweetData: TweetData;
  deleteTweetMutation: UseDeleteTweetMutationReturn;
}

export const TweetCardAuthor = ({
  isOwner,
  tweetData: {
    author: { name, screenName },
    createdAt
  },
  deleteTweetMutation
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
          <TweetCardMenu
            isOwner={isOwner}
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            deleteTweetMutation={deleteTweetMutation}
          />
        </RightColumn>
      )}
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

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin: -8px -6px -8px;
  z-index: 1;
`;
