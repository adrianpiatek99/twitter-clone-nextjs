import type { RouterInputs, RouterOutputs } from "utils/api";

export type TweetData = TweetCreateOutputs;

export type LikedTweetData = TweetLikesTimelineOutputs["likedTweets"][number];

export type TweetCreateInputs = RouterInputs["tweet"]["create"];

export type TweetCreateOutputs = RouterOutputs["tweet"]["create"];

export type TweetTimelineInputs = RouterInputs["tweet"]["timeline"];

export type TweetTimelineOutputs = RouterOutputs["tweet"]["timeline"];

export type TweetProfileTimelineInputs = RouterInputs["tweet"]["profileTimeline"];

export type TweetProfileTimelineOutputs = RouterOutputs["tweet"]["profileTimeline"];

export type TweetDetailsInputs = RouterInputs["tweet"]["details"];

export type TweetDetailsOutputs = RouterOutputs["tweet"]["details"];

export type TweetLikesTimelineInputs = RouterInputs["tweet"]["likesTimeline"];

export type TweetLikesTimelineOutputs = RouterOutputs["tweet"]["likesTimeline"];
