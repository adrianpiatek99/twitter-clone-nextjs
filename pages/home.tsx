import React, { useRef } from "react";

import { HomeTopBar } from "components/home-page";
import { useAppSession } from "hooks/useAppSession";
import { useVirtualScroll } from "hooks/useVirtualScroll";
import { NextSeo } from "next-seo";
import { CreateTweetForm } from "shared/Forms";
import { InfiniteScrollingSection } from "shared/InfiniteScrollingSection";
import { TweetCell, TweetCellSkeleton } from "shared/TweetCell";
import type { TweetData } from "types/tweet";
import { api } from "utils/api";
import { createArray } from "utils/array";

const Home = () => {
  const { isAuthenticated } = useAppSession();
  const homeTimelineInfiniteQuery = api.tweet.timeline.useInfiniteQuery(
    {},
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      retry: false
    }
  );
  const { data, isLoading, error } = homeTimelineInfiniteQuery;
  const flatData = data?.pages.flatMap(page => page["tweets"]) ?? [];
  const parentRef = useRef<HTMLDivElement>(null);
  const { items, measureElement, totalSize } = useVirtualScroll(flatData, parentRef);

  return (
    <>
      <NextSeo title="Home / Twitter" description="Home" />
      <HomeTopBar />
      {isAuthenticated && <CreateTweetForm />}
      <InfiniteScrollingSection
        {...homeTimelineInfiniteQuery}
        ref={parentRef}
        flatDataCount={flatData.length}
        errorMessage={error?.message ?? ""}
        emptyMessage="Lack of tweets"
        ariaLabel="Timeline: Your Home Timeline"
      >
        {isLoading ? (
          createArray(3).map(skeleton => (
            <TweetCellSkeleton key={skeleton} isEven={skeleton % 2 === 0} />
          ))
        ) : (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: `${totalSize}px`
            }}
          >
            {items.map(({ index, start }) => {
              const tweet = flatData[index] as TweetData;

              return (
                <TweetCell
                  key={index}
                  ref={measureElement}
                  data-index={index}
                  tweetData={tweet}
                  start={start}
                />
              );
            })}
          </div>
        )}
      </InfiniteScrollingSection>
    </>
  );
};

export default Home;
