import {
  BOOKMARKS_PAGE_ROUTE,
  EXPLORE_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MESSAGES_PAGE_ROUTE,
  NOTIFICATIONS_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE
} from "constants/routes";
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
  route: string;
  icon: SvgrElement;
  activeIcon: SvgrElement;
};

export const authenticatedNavSidebarItems: NavSidebarItemType[] = [
  {
    text: "Explore",
    route: EXPLORE_PAGE_ROUTE,
    icon: HashtagOutlinedIcon,
    activeIcon: HashtagIcon
  },
  {
    text: "Notifications",
    route: NOTIFICATIONS_PAGE_ROUTE,
    icon: NotificationOutlinedIcon,
    activeIcon: NotificationIcon
  },
  {
    text: "Messages",
    route: MESSAGES_PAGE_ROUTE,
    icon: MailOutlinedIcon,
    activeIcon: MailIcon
  },
  {
    text: "Bookmarks",
    route: BOOKMARKS_PAGE_ROUTE,
    icon: BookmarkOutlinedIcon,
    activeIcon: BookmarkIcon
  }
];

export const navSidebarHomeItem: NavSidebarItemType = {
  text: "Home",
  route: HOME_PAGE_ROUTE,
  icon: HomeOutlinedIcon,
  activeIcon: HomeIcon
};

export const navSidebarProfileItem: NavSidebarItemType = {
  text: "Profile",
  route: PROFILE_PAGE_ROUTE,
  icon: PersonOutlinedIcon,
  activeIcon: PersonIcon
};
