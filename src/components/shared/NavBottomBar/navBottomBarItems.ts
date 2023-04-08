import {
  EXPLORE_PAGE_ROUTE,
  HOME_PAGE_ROUTE,
  MESSAGES_PAGE_ROUTE,
  NOTIFICATIONS_PAGE_ROUTE
} from "constants/routes";
import {
  HomeIcon,
  HomeOutlinedIcon,
  LoginIcon,
  MailIcon,
  MailOutlinedIcon,
  NotificationIcon,
  NotificationOutlinedIcon,
  SearchIcon,
  SearchOutlinedIcon
} from "icons/index";

export type NavBottomBarItem = {
  text: string;
  href: string;
  icon: SvgrElement;
  activeIcon: SvgrElement;
};

export const navBottomBarItems: NavBottomBarItem[] = [
  {
    text: "Home",
    href: HOME_PAGE_ROUTE,
    icon: HomeOutlinedIcon,
    activeIcon: HomeIcon
  },
  {
    text: "Search",
    href: EXPLORE_PAGE_ROUTE,
    icon: SearchOutlinedIcon,
    activeIcon: SearchIcon
  },
  {
    text: "Notifications",
    href: NOTIFICATIONS_PAGE_ROUTE,
    icon: NotificationOutlinedIcon,
    activeIcon: NotificationIcon
  },
  {
    text: "Messages",
    href: MESSAGES_PAGE_ROUTE,
    icon: MailOutlinedIcon,
    activeIcon: MailIcon
  }
];

export const navBottomBarSignInItem: NavBottomBarItem = {
  text: "Sign in",
  href: "/",
  icon: LoginIcon,
  activeIcon: LoginIcon
};
