import React, { useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButtonWithLabel } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import RetweetIcon from "icons/RetweetIcon";
import dynamic from "next/dynamic";
import useGlobalStore from "store/globalStore";
import styled, { useTheme } from "styled-components";

const LazyReplyTweetModal = dynamic(
  () => import("../Modals/ReplyTweetModal").then(mod => mod.ReplyTweetModal),
  {
    ssr: false
  }
);

interface TweetCellToolbarProps {
  tweetData: TweetData;
  isLoading: boolean;
  isLiked: boolean;
  handleLikeTweet: () => void;
}

export const TweetCellToolbar = ({
  handleLikeTweet,
  isLoading,
  isLiked,
  tweetData
}: TweetCellToolbarProps) => {
  const {
    _count: { replies, likes }
  } = tweetData;
  const { isUnauthenticated } = useAppSession();
  const openAuthRequiredModal = useGlobalStore(store => store.openAuthRequiredModal);
  const { pink400, emerald400 } = useTheme();
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const likeTitle = isLiked ? "Unlike" : "Like";

  const handleOpenReplyModal = () => {
    if (isUnauthenticated) {
      return openAuthRequiredModal(true);
    }

    setIsReplyModalOpen(prev => !prev);
  };

  return (
    <Wrapper>
      <IconButtonWithLabel
        onClick={handleOpenReplyModal}
        title="Reply"
        label={String(replies)}
        color="secondary"
      >
        <MessageIcon />
      </IconButtonWithLabel>
      <IconButtonWithLabel
        onClick={handleLikeTweet}
        title={likeTitle}
        label={String(likes)}
        color={pink400}
        isSelected={isLiked}
        disabled={isLoading}
      >
        {isLiked ? <HeartIcon /> : <HeartOutlinedIcon />}
      </IconButtonWithLabel>
      <IconButtonWithLabel title="Retweet" label={"0"} color={emerald400} disabled>
        <RetweetIcon />
      </IconButtonWithLabel>
      <LazyReplyTweetModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        tweetData={tweetData}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  gap: 8px 12px;
  min-width: 200px;
  max-width: 425px;
  z-index: 1;
`;
