import { IconType } from "react-icons";
import { BsBookmark } from "react-icons/bs";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

export type NavDrawerItemType = {
  text: string;
  href?: string;
  icon: IconType;
};

export const navDrawerProfileItem: NavDrawerItemType = {
  text: "Profile",
  href: "/[screenName]",
  icon: MdOutlinePerson
};

export const navDrawerLogOutItem: NavDrawerItemType = {
  text: "Log out",
  icon: MdOutlineLogout
};

export const navDrawerPrimaryItems: NavDrawerItemType[] = [
  {
    text: "Bookmarks",
    href: "/bookmarks",
    icon: BsBookmark
  }
];
