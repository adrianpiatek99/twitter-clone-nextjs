import type { IconType } from "react-icons";

import LogoutIcon from "icons/LogoutIcon";
import PersonOutlinedIcon from "icons/PersonOutlinedIcon";

export type NavDrawerItemType = {
  text: string;
  href?: string;
  icon: IconType;
};

export const navDrawerProfileItem: NavDrawerItemType = {
  text: "Profile",
  href: "/[screenName]",
  icon: PersonOutlinedIcon
};

export const navDrawerLogOutItem: NavDrawerItemType = {
  text: "Log out",
  icon: LogoutIcon
};