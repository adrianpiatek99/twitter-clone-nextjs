import type { IconType } from "react-icons";

import BookmarkIcon from "icons/BookmarkIcon";
import BookmarkOutlinedIcon from "icons/BookmarkOutlinedIcon";
import HashtagIcon from "icons/HashtagIcon";
import HashtagOutlinedIcon from "icons/HashtagOutlinedIcon";
import HomeIcon from "icons/HomeIcon";
import HomeOutlinedIcon from "icons/HomeOutlinedIcon";
import MailIcon from "icons/MailIcon";
import MailOutlinedIcon from "icons/MailOutlinedIcon";
import NotificationIcon from "icons/NotificationIcon";
import NotificationOutlinedIcon from "icons/NotificationOutlinedIcon";
import PersonIcon from "icons/PersonIcon";
import PersonOutlinedIcon from "icons/PersonOutlinedIcon";

export type NavSidebarItemType = {
  text: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

export const authenticatedNavSidebarItems: NavSidebarItemType[] = [
  {
    text: "Explore",
    href: "/explore",
    icon: HashtagOutlinedIcon,
    activeIcon: HashtagIcon
  },
  {
    text: "Notifications",
    href: "/notifications",
    icon: NotificationOutlinedIcon,
    activeIcon: NotificationIcon
  },
  {
    text: "Messages",
    href: "/messages",
    icon: MailOutlinedIcon,
    activeIcon: MailIcon
  },
  {
    text: "Bookmarks",
    href: "/bookmarks",
    icon: BookmarkOutlinedIcon,
    activeIcon: BookmarkIcon
  }
];

export const navSidebarHomeItem: NavSidebarItemType = {
  text: "Home",
  href: "/home",
  icon: HomeOutlinedIcon,
  activeIcon: HomeIcon
};

export const navSidebarProfileItem: NavSidebarItemType = {
  text: "Profile",
  href: "/[screenName]",
  icon: PersonOutlinedIcon,
  activeIcon: PersonIcon
};
