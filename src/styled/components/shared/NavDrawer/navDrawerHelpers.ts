import { IconType } from "react-icons";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { HiHashtag } from "react-icons/hi";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiMail } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlinePerson } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { RiNotification2Fill } from "react-icons/ri";

export type NavDrawerItem = {
  text: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

export const authenticatedNavDrawerItems: NavDrawerItem[] = [
  {
    text: "Explore",
    href: "/explore",
    icon: HiOutlineHashtag,
    activeIcon: HiHashtag
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
  },
  {
    text: "Bookmarks",
    href: "/bookmarks",
    icon: BsBookmark,
    activeIcon: BsBookmarkFill
  }
];

export const navDrawerHomeItem: NavDrawerItem = {
  text: "Home",
  href: "/home",
  icon: HiOutlineHome,
  activeIcon: HiHome
};

export const navDrawerProfileItem: NavDrawerItem = {
  text: "Profile",
  href: "/[screenName]",
  icon: MdOutlinePerson,
  activeIcon: MdPerson
};
