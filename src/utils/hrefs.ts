import {
  FOLLOWERS_PAGE_ROUTE,
  FOLLOWING_PAGE_ROUTE,
  LIKES_PAGE_ROUTE,
  MEDIA_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE,
  TWEET_PAGE_ROUTE,
  WITH_REPLIES_PAGE_ROUTE
} from "constants/routes";
import type { LinkProps } from "next/link";

type Href = LinkProps["href"];

export const tweetPageHref = (tweetId: string, screenName: string): Href => ({
  pathname: TWEET_PAGE_ROUTE,
  query: { tweetId, screenName }
});

export const profilePageHref = (screenName: string): Href => ({
  pathname: PROFILE_PAGE_ROUTE,
  query: { screenName }
});

export const withRepliesPageHref = (screenName: string): Href => ({
  pathname: WITH_REPLIES_PAGE_ROUTE,
  query: { screenName }
});

export const mediaPageHref = (screenName: string): Href => ({
  pathname: MEDIA_PAGE_ROUTE,
  query: { screenName }
});

export const likesPageHref = (screenName: string): Href => ({
  pathname: LIKES_PAGE_ROUTE,
  query: { screenName }
});

export const followingPageHref = (screenName: string): Href => ({
  pathname: FOLLOWING_PAGE_ROUTE,
  query: { screenName }
});

export const followersPageHref = (screenName: string): Href => ({
  pathname: FOLLOWERS_PAGE_ROUTE,
  query: { screenName }
});
