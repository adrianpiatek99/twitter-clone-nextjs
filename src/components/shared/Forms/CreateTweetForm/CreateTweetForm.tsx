import React, { lazy, Suspense, useEffect, useState } from "react";

import { Textarea } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useAutoAnimate } from "hooks/useAutoAnimate";
import { useCreateTweetMutation } from "hooks/useCreateTweetMutation";
import { useUploadImageFile } from "hooks/useUploadImageFile";
import { TWEET_MAX_LENGTH } from "schema/tweetSchema";
import { Avatar } from "shared/Avatar";
import createTweetStore, { CREATE_TWEET_PHOTOS_LIMIT } from "store/createTweetStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";

import { CreateTweetToolbar } from "./CreateTweetToolbar";

const LazyCreateTweetMedia = lazy(() =>
  import("./CreateTweetMedia").then(mod => ({ default: mod.CreateTweetMedia }))
);

export const CreateTweetForm = () => {
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
  } = createTweetStore(
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
      resetFileStates();
      resetStore();
    }
  });
  const [uploadingImages, setUploadingImages] = useState(false);
  const [wrapperRef] = useAutoAnimate<HTMLDivElement>();
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
        <BottomRow ref={wrapperRef}>
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
          <CreateTweetToolbar
            tweetLength={tweetText.length ?? 0}
            tweetMediaCount={tweetFiles.length}
            onSubmit={onSubmit}
            loading={isLoading}
            onFileChange={onFileChange}
          />
        </BottomRow>
      </RightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    border-top: 1px solid ${({ theme }) => theme.border};
    border-bottom: 1px solid ${({ theme }) => theme.border};
    margin-bottom: 4px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
