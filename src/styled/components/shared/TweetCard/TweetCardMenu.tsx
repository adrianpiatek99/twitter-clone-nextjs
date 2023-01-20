import React from "react";

import { TweetData } from "api/tweet/timelineTweets";
import { MenuModal, MenuModalItem } from "components/core";

interface TweetCardMenuProps {
  isOpen: boolean;
  isOwner: boolean;
  tweetId: TweetData["id"];
  onClose: () => void;
}

export const TweetCardMenu = ({ isOpen, isOwner, onClose }: TweetCardMenuProps) => {
  return (
    <MenuModal isOpen={isOpen} onClose={onClose}>
      <>{isOwner && <MenuModalItem color="danger">Delete tweet</MenuModalItem>}</>
    </MenuModal>
  );
};
