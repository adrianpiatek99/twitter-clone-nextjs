import React, { lazy, Suspense, useEffect, useState } from "react";

import { Modal, Textarea } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import { useUploadImageFile } from "hooks/useUploadImageFile";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import { CreateTweetToolbar } from "shared/Forms";
import createTweetModalStore from "store/createTweetModalStore";
import { CREATE_TWEET_PHOTOS_LIMIT } from "store/createTweetStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";

const LazyCreateTweetMedia = lazy(() =>
  import("components/shared/Forms/CreateTweetForm").then(mod => ({ default: mod.CreateTweetMedia }))
);

interface CreateTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTweetModal = ({ isOpen, onClose }: CreateTweetModalProps) => {
  const { session } = useAppSession();
  const {
    tweetText,
    tweetFiles,
    aspectRatio,
    setTweetText,
    addTweetFiles,
    setAspectRatio,
    removeTweetFile,
    resetStore
  } = createTweetModalStore(
    state => ({
      tweetText: state.tweetText,
      tweetFiles: state.tweetFiles,
      aspectRatio: state.aspectRatio,
      setTweetText: state.setTweetText,
      addTweetFiles: state.addTweetFiles,
      setAspectRatio: state.setAspectRatio,
      removeTweetFile: state.removeTweetFile,
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
            <Suspense>
              {!!tweetFiles.length && (
                <LazyCreateTweetMedia
                  tweetFiles={tweetFiles}
                  aspectRatio={aspectRatio}
                  isLoading={isLoading}
                  setAspectRatio={setAspectRatio}
                  removeTweetFile={removeTweetFile}
                />
              )}
            </Suspense>
            <Divider />
            <CreateTweetToolbar
              isInModal
              tweetLength={tweetText.length ?? 0}
              tweetMediaCount={tweetFiles.length}
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
  margin-bottom: 4px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 100%;
  min-height: 250px;
  flex-grow: 1;
  gap: 12px;

  @media ${({ theme }) => theme.breakpoints.md} {
    min-height: 180px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border};
`;
