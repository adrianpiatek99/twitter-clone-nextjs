import React, { useCallback, useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import styled from "styled-components";
import { getRelativeTime } from "utils/time";

import { TweetCellMenuModal } from "./Modals";

interface TweetCellActionsProps {
  tweetData: TweetData;
  isOwner: boolean;
}

export const TweetCellActions = ({ isOwner, tweetData }: TweetCellActionsProps) => {
  const {
    author: { name, screenName },
    createdAt
  } = tweetData;
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
          <IconButton title="More" onClick={handleToggleMenuModal} color="secondary">
            <MoreHorizontalIcon />
          </IconButton>
          <TweetCellMenuModal
            tweetData={tweetData}
            isOwner={isOwner}
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
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
