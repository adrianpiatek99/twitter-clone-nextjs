import React, { useEffect, useState } from "react";

import { Modal, Textarea } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import { useUploadImageFile } from "hooks/useUploadImageFile";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import { CreateTweetMedia, CreateTweetToolbar } from "shared/Forms/CreateTweetForm";
import createTweetStore, { CREATE_TWEET_PHOTOS_LIMIT } from "store/createTweetStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";

interface CreateTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTweetModal = ({ isOpen, onClose }: CreateTweetModalProps) => {
  const { session } = useAppSession();
  const { tweetText, setTweetText, tweetFiles, addTweetFiles, resetStore } = createTweetStore(
    state => ({
      tweetText: state.tweetText,
      setTweetText: state.setTweetText,
      tweetFiles: state.tweetFiles,
      addTweetFiles: state.addTweetFiles,
      resetStore: state.resetStore
    }),
    shallow
  );
  const { files, onFileChange, uploadImageFile, resetFileStates } = useUploadImageFile({
    limit: CREATE_TWEET_PHOTOS_LIMIT
  });
  const { handleCreateTweet, createTweetLoading } = useCreateTweetMutation({
    onSuccess: () => {
      onClose();
      resetFileStates();
      resetStore();
    }
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  const isLoading = uploadingImages || createTweetLoading;

  const onSubmit = async () => {
    try {
      setUploadingImages(true);

      const images = await Promise.all(tweetFiles.map(({ file }) => uploadImageFile(file)));

      handleCreateTweet({ text: tweetText, media: images });
    } finally {
      setUploadingImages(false);
    }
  };

  useEffect(() => {
    if (files.length) {
      resetFileStates();
      addTweetFiles(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, addTweetFiles]);

  if (!session) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onAccept={onSubmit}
      acceptButtonText="Create"
      acceptButtonDisabled={!tweetText.length}
      loading={isLoading}
    >
      <Wrapper>
        <LeftColumn>
          <Avatar
            src={session.user.profileImageUrl}
            screenName={session.user.screenName}
            size="large"
          />
        </LeftColumn>
        <RightColumn>
          <Textarea
            label="Create a tweet"
            value={tweetText}
            onChange={e => setTweetText(e.target.value)}
            placeholder="What's happening?"
            maxLength={TWEET_MAX_LENGTH}
            disabled={isLoading}
          />
          <BottomRow>
            {!!tweetFiles.length && <CreateTweetMedia isLoading={isLoading} />}
            <CreateTweetToolbar
              isMobileModal
              tweetLength={tweetText.length ?? 0}
              onSubmit={onSubmit}
              loading={isLoading}
              onFileChange={onFileChange}
            />
          </BottomRow>
        </RightColumn>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  min-height: 275px;
  margin-bottom: 4px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  gap: 12px;
  padding-bottom: 50px;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
