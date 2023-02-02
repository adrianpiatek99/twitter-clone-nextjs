import React, { memo, useCallback, useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import styled from "styled-components";
import { getRelativeTime } from "utils/timeUtils";

import { TweetCardMenu } from "./TweetCardMenu";

interface TweetCardActionsProps {
  isOwner: boolean;
  author: TweetData["author"];
  createdAt: TweetData["createdAt"];
  handleDeleteTweet: () => void;
}

export const TweetCardActions = memo(
  ({
    isOwner,
    author: { name, screenName },
    createdAt,
    handleDeleteTweet
  }: TweetCardActionsProps) => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const handleToggleMenuModal = useCallback(() => setIsMenuModalOpen(prev => !prev), []);

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
            <IconButton onClick={handleToggleMenuModal} color="secondary">
              <MoreHorizontalIcon />
            </IconButton>
            <TweetCardMenu
              isOwner={isOwner}
              isOpen={isMenuModalOpen}
              onClose={() => setIsMenuModalOpen(false)}
              handleDeleteTweet={handleDeleteTweet}
            />
          </RightColumn>
        )}
      </Wrapper>
    );
  }
);

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
