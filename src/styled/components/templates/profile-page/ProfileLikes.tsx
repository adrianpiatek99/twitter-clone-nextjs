import React from "react";

import type {
  LikedTweetData,
  LikedTweetsRequest,
  LikedTweetsResponse
} from "api/tweet/likedTweets";
import type { UserData } from "api/user/userByScreenName";
import { Loader } from "components/core";
import { useInfiniteScrollQuery } from "hooks/useInfiniteScrollQuery";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { likedTweets } from "network/tweet/likedTweets";
import { EmptyMessage, ErrorMessage } from "shared/Messages";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import styled from "styled-components";

interface ProfileLikesProps {
  userData: UserData;
}

export const ProfileLikes = ({ userData: { id: userId, screenName } }: ProfileLikesProps) => {
  const { data, isLoading, isFetching, lastItemRef, hasNextPage, isError, error } =
    useInfiniteScrollQuery<LikedTweetsRequest, LikedTweetsResponse, LikedTweetData>({
      queryKey: ["likedTweets", screenName],
      queryFn: likedTweets,
      params: {
        userId
      }
    });
  const { items, measureElement, totalSize } = useVirtualScroll(data, 600);
  const skeletons = Array(3)
    .fill("")
    .map((_, i) => i + 1);

  if (isError) {
    return <ErrorMessage title={error.message} />;
  }

  if (!isLoading && data.length === 0) {
    return <EmptyMessage text="Lack of likes" />;
  }

  return (
    <LikedTweetsSection aria-label={`Timeline: ${screenName}’s Likes`}>
      {isLoading ? (
        skeletons.map(skeleton => <TweetCellSkeleton key={skeleton} isEven={skeleton % 2 === 0} />)
      ) : (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${totalSize}px`
          }}
        >
          {items.map(({ index, start }) => {
            const like = data[index] as LikedTweetData;

            return (
              <TweetCell
                key={index}
                data-index={index}
                ref={measureElement}
                start={start}
                tweetData={like.tweet}
              />
            );
          })}
        </div>
      )}
      {isFetching && !isLoading && (
        <LoaderWrapper additionalPadding>
          <Loader center />
        </LoaderWrapper>
      )}
      {hasNextPage && !isLoading && <LoadMoreItems ref={lastItemRef} />}
    </LikedTweetsSection>
  );
};

const LikedTweetsSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 100px;
`;

const LoaderWrapper = styled.div<{ additionalPadding?: boolean }>`
  margin: 30px 0;
  padding-bottom: ${({ additionalPadding }) => additionalPadding && "40px"};
`;

const LoadMoreItems = styled.div`
  position: absolute;
  bottom: 0px;
  height: 95vh;
  left: 0px;
  pointer-events: none;
`;
