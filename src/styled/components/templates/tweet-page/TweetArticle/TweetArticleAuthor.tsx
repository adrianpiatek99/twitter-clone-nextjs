import React, { useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import type { UseDeleteTweetMutationReturn } from "hooks/useDeleteTweetMutation";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import { Avatar } from "shared/Avatar";
import { TweetCardMenu } from "shared/TweetCard/TweetCardMenu";
import styled from "styled-components";

interface TweetArticleAuthorProps {
  tweetData: TweetData;
  isOwner: boolean;
  deleteTweetMutation: UseDeleteTweetMutationReturn;
}

export const TweetArticleAuthor = ({
  tweetData: {
    author: { name, screenName, profileImageUrl }
  },
  isOwner,
  deleteTweetMutation
}: TweetArticleAuthorProps) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <Wrapper>
      <Content>
        <Avatar src={profileImageUrl} screenName={screenName} size="large" />
        <NamesWrapper>
          <Text weight={700} href={`/${screenName}`} truncate>
            {name}
          </Text>
          <Text color="secondary" href={`/${screenName}`} truncate>
            @{screenName}
          </Text>
        </NamesWrapper>
      </Content>
      {isOwner && (
        <Actions>
          <IconButton onClick={() => setIsMenuModalOpen(prev => !prev)} color="secondary">
            <MoreHorizontalIcon />
          </IconButton>
          <TweetCardMenu
            isOwner={isOwner}
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            deleteTweetMutation={deleteTweetMutation}
          />
        </Actions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.neutral300};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0px;
`;

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & * {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-self: start;
  margin: -8px -6px -8px;
`;