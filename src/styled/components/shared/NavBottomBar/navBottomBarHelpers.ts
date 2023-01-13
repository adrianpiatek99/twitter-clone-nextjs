import { HiMail } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { RiHome5Fill } from "react-icons/ri";
import { RiHome5Line } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";
import { RiNotification2Fill } from "react-icons/ri";

export type NavBottomBarItem = {
  text: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

export const authenticatedNavBottomBarItems: NavBottomBarItem[] = [
  {
    text: "Home",
    href: "/home",
    icon: RiHome5Line,
    activeIcon: RiHome5Fill
  },
  {
    text: "Search",
    href: "/explore",
    icon: RiSearchLine,
    activeIcon: RiSearchFill
  },
  {
    text: "Notifications",
    href: "/notifications",
    icon: RiNotification2Line,
    activeIcon: RiNotification2Fill
  },
  {
    text: "Messages",
    href: "/messages",
    icon: HiOutlineMail,
    activeIcon: HiMail
  }
];
