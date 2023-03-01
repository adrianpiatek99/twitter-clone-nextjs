import {
  BookmarkIcon,
  BookmarkOutlinedIcon,
  HashtagIcon,
  HashtagOutlinedIcon,
  HomeIcon,
  HomeOutlinedIcon,
  MailIcon,
  MailOutlinedIcon,
  NotificationIcon,
  NotificationOutlinedIcon,
  PersonIcon,
  PersonOutlinedIcon
} from "icons/index";

export type NavSidebarItemType = {
  text: string;
  href: string;
  icon: SvgrElement;
  activeIcon: SvgrElement;
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
