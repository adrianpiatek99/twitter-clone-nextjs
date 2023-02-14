import type { IconType } from "react-icons/lib";

import HomeIcon from "icons/HomeIcon";
import HomeOutlinedIcon from "icons/HomeOutlinedIcon";
import LoginIcon from "icons/LoginIcon";
import MailIcon from "icons/MailIcon";
import MailOutlinedIcon from "icons/MailOutlinedIcon";
import NotificationIcon from "icons/NotificationIcon";
import NotificationOutlinedIcon from "icons/NotificationOutlinedIcon";
import SearchIcon from "icons/SearchIcon";
import SearchOutlinedIcon from "icons/SearchOutlinedIcon";

export type NavBottomBarItem = {
  text: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

export const navBottomBarItems: NavBottomBarItem[] = [
  {
    text: "Home",
    href: "/home",
    icon: HomeOutlinedIcon,
    activeIcon: HomeIcon
  },
  {
    text: "Search",
    href: "/explore",
    icon: SearchOutlinedIcon,
    activeIcon: SearchIcon
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
  }
];

export const navBottomBarSignInItem: NavBottomBarItem = {
  text: "Sign in",
  href: "/",
  icon: LoginIcon,
  activeIcon: LoginIcon
};
