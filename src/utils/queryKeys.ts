import type { QueryKey } from "types/react-query";
import type {
  TweetDetailsInputs,
  TweetLikesTimelineInputs,
  TweetProfileTimelineInputs,
  TweetTimelineInputs
} from "types/tweet";
import type { TweetRepliesInputs } from "types/tweetReply";
import type { UserByScreenNameInputs, UserFollowersInputs, UserFollowingInputs } from "types/user";

const tweetTimelineQueryKey = (): QueryKey<TweetTimelineInputs> => [
  ["tweet", "timeline"],
  { input: {}, type: "infinite" }
];

const tweetProfileTimelineQueryKey = ({
  profileScreenName
}: TweetProfileTimelineInputs): QueryKey<TweetProfileTimelineInputs> => [
  ["tweet", "profileTimeline"],
  { input: { profileScreenName }, type: "infinite" }
];

const tweetLikesTimelineQueryKey = ({
  profileScreenName
}: TweetLikesTimelineInputs): QueryKey<TweetLikesTimelineInputs> => [
  ["tweet", "likesTimeline"],
  { input: { profileScreenName }, type: "infinite" }
];

const tweetDetailsQueryKey = ({ tweetId }: TweetDetailsInputs): QueryKey<TweetDetailsInputs> => [
  ["tweet", "details"],
  { input: { tweetId }, type: "query" }
];

const tweetRepliesQueryKey = ({ tweetId }: TweetRepliesInputs): QueryKey<TweetRepliesInputs> => [
  ["tweetReply", "replies"],
  { input: { tweetId }, type: "infinite" }
];

const userByScreenNameQueryKey = ({
  screenName
}: UserByScreenNameInputs): QueryKey<UserByScreenNameInputs> => [
  ["user", "byScreenName"],
  { input: { screenName }, type: "query" }
];

const userFollowingQueryKey = ({
  screenName
}: UserFollowingInputs): QueryKey<UserFollowingInputs> => [
  ["user", "following"],
  { input: { screenName }, type: "infinite" }
];

const userFollowersQueryKey = ({
  screenName
}: UserFollowersInputs): QueryKey<UserFollowersInputs> => [
  ["user", "followers"],
  { input: { screenName }, type: "infinite" }
];

export const queryKeys = {
  tweetTimelineQueryKey,
  tweetProfileTimelineQueryKey,
  tweetLikesTimelineQueryKey,
  tweetDetailsQueryKey,
  tweetRepliesQueryKey,
  userByScreenNameQueryKey,
  userFollowingQueryKey,
  userFollowersQueryKey
};
