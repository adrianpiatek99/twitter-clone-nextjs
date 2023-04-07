import React, { useState } from "react";

import { IconButton, Text } from "components/core";
import { MoreHorizontalIcon } from "icons/index";
import { useRouter } from "next/router";
import { Avatar } from "shared/Avatar";
import { TweetCellMenuModal } from "shared/TweetCell";
import useTweetPageStore from "store/tweetPageStore";
import styled from "styled-components";
import type { TweetData } from "types/tweet";

interface TweetArticleAuthorProps {
  tweetData: TweetData;
  isOwner: boolean;
}

export const TweetArticleAuthor = ({ tweetData, isOwner }: TweetArticleAuthorProps) => {
  const {
    author: { name, screenName, profileImageUrl }
  } = tweetData;
  const { push } = useRouter();
  const referer = useTweetPageStore(state => state.referer);
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
          <TweetCellMenuModal
            tweetData={tweetData}
            isOwner={isOwner}
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            onDeleteSuccess={() => push(referer)}
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
