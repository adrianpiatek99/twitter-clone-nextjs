import type { RouterInputs, RouterOutputs } from "utils/api";

export type ReplyData = TweetReplyCreateOutputs;

export type TweetReplyCreateInputs = RouterInputs["tweetReply"]["create"];

export type TweetReplyCreateOutputs = RouterOutputs["tweetReply"]["create"];

export type TweetRepliesInputs = RouterInputs["tweetReply"]["replies"];

export type TweetRepliesOutputs = RouterOutputs["tweetReply"]["replies"];
