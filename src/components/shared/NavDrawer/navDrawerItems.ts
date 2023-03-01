import { LogoutIcon, PersonOutlinedIcon } from "icons/index";

export type NavDrawerItemType = {
  text: string;
  href?: string;
  icon: SvgrElement;
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
